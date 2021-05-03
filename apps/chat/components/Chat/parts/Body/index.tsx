import React, { FC, memo, useEffect, useRef, useState } from 'react'
import {
  MessageContextProvider,
  ProposalContextProvider,
  useProposal
} from '@botui/hooks'
import { useChatControllerServer } from '@botui/chat-controller'
import { css } from '@emotion/react'
import { MessageWrapper } from './MessageWrapper'
import { Message } from './Message'
import {
  ProposalCloser,
  ProposalRelayer,
  Proposals,
  ProposalSkipper,
  Skipper,
  SkipperCondition,
  SkipperConditionOperator
} from '@botui/types'
import { requestNotify } from '../../../../pages/api/notify'
import PulseLoader from 'react-spinners/PulseLoader'

const style = {
  root: css({
    padding: '5px 15px 150px 15px',
    overflowY: 'scroll',
    msOverflowStyle: 'none', // スクロールバーを隠す(IE、Edge)
    scrollbarWidth: 'none', // スクロールバーを隠す(Firefox)
    '&::-webkit-scrollbar': {
      display: 'none' // スクロールバーを隠す(Chrome、Safari)
    },
    position: 'relative'
  })
}

export const Body: FC = () => {
  const { proposals } = useChatControllerServer()

  return <BodyInnerMemorized proposals={proposals} />
}

const BodyInner: FC<{ proposals: Proposals }> = ({ proposals }) => {
  return (
    <div css={style.root}>
      {proposals.map((proposal) => (
        <ProposalContextProvider key={proposal.id} proposal={proposal}>
          {proposal.type === 'message' ? (
            <MessageContextProvider message={proposal.data}>
              <MessageWrapper>
                <Message />
              </MessageWrapper>
            </MessageContextProvider>
          ) : proposal.type === 'skipper' ? (
            <SkipperComponent proposal={proposal} />
          ) : proposal.type === 'relayer' ? (
            <RelayerComponent proposal={proposal} />
          ) : (
            <CloserComponent proposal={proposal} />
          )}
        </ProposalContextProvider>
      ))}
    </div>
  )
}

const BodyInnerMemorized = memo(BodyInner)

const RelayerComponent: FC<{ proposal: ProposalRelayer }> = ({ proposal }) => {
  const { formPush, evalFunction } = useChatControllerServer()
  const [, { handleUpdate }] = useProposal()
  const mounted = useRef(true)
  useEffect(() => {
    if (!mounted.current) return
    if (proposal.data.job === 'script') {
      evalFunction(proposal.data.script).then(() => handleUpdate())
    }
    if (proposal.data.job === 'webhook') {
      // FIXME:
      handleUpdate()
    }
    if (proposal.data.job === 'formPush') {
      // NOTE: ページ遷移により強制的にチャット終了の可能性がある
      formPush(proposal.data).then(() => handleUpdate())
    }
    return () => {
      mounted.current = false
    }
  }, [evalFunction, formPush, handleUpdate, proposal.data])

  return null
}

const closerStyles = {
  spinner: css({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }),
  base: css({
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.6,
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4'
  })
}

const CloserComponent: FC<{ proposal: ProposalCloser }> = ({ proposal }) => {
  const {
    formPush,
    evalFunction,
    addEntry,
    values,
    session,
    complete: handleComplete
  } = useChatControllerServer()
  const [complete, setComplete] = useState(false)
  const mounted = useRef(true)
  useEffect(() => {
    if (!mounted.current) return
    if (proposal.data.notify) {
      requestNotify(values, session)
    }
    if (proposal.data.job === 'store') {
      addEntry()
      setComplete(true)
    }
    if (proposal.data.job === 'script') {
      evalFunction(proposal.data.script).then(() => setComplete(true))
    }
    if (proposal.data.job === 'webhook') {
      // TODO:
      setComplete(true)
    }

    if (proposal.data.job === 'formPush') {
      // NOTE: ページ遷移により強制的にチャット終了の可能性がある
      formPush(proposal.data).then(() => setComplete(true))
    }
    if (proposal.data.job === 'none') setComplete(true)

    return () => {
      mounted.current = false
    }
  }, [addEntry, evalFunction, formPush, proposal.data, session, values])

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => setLoading(true), 3000)
  }, [])

  useEffect(() => {
    if (complete && loading) handleComplete()
  }, [complete, handleComplete, loading])

  if (!loading) return null
  return (
    <>
      <div css={closerStyles.base} />
      <div css={closerStyles.spinner}>
        <PulseLoader
          size={15}
          margin={5}
          color={session.theme.header?.backgroundColor}
        />
      </div>
    </>
  )
}

const SkipperComponent: FC<{ proposal: ProposalSkipper }> = ({ proposal }) => {
  const mounted = useRef(true)
  const { values } = useChatControllerServer()
  const [, { handleUpdate }] = useProposal()
  useEffect(() => {
    if (!mounted.current) return
    const skipNum = skipperEvaluate(proposal.data, values)
    handleUpdate(skipNum)
    return () => {
      mounted.current = false
    }
  }, [handleUpdate, proposal.data, values])

  return null
}

export type PatternType = SkipperCondition['pattern']
export type ValueType = unknown

export const skipperEvaluate = (
  skipper: Skipper,
  values: Record<string, ValueType>
): Skipper['skipNumber'] => {
  const { conditions, logic } = skipper
  if (logic === 'and')
    return conditions.every(({ pattern, key, operator, negative }) =>
      operate(values[key], operator, pattern, negative)
    )
      ? skipper.skipNumber
      : 0
  if (logic === 'or')
    return conditions.some(({ pattern, key, operator, negative }) =>
      operate(values[key], operator, pattern, negative)
    )
      ? skipper.skipNumber
      : 0
  return 0
}

const operate = (
  left: ValueType,
  operator: SkipperConditionOperator,
  right: PatternType,
  negative: boolean
): boolean => {
  if (operator === 'eq') return !negative ? _eq(left, right) : !_eq(left, right)
  if (operator === 'lt') return !negative ? _lt(left, right) : !_lt(left, right)
  if (operator === 'lteq')
    return !negative ? _lteq(left, right) : !_lteq(left, right)
  if (operator === 'gt') return !negative ? _gt(left, right) : !_gt(left, right)
  if (operator === 'gteq')
    return !negative ? _gteq(left, right) : !_gteq(left, right)
  if (operator === 'start')
    return !negative ? _start(left, right) : !_start(left, right)
  if (operator === 'end')
    return !negative ? _end(left, right) : !_end(left, right)
  if (operator === 'cont')
    return !negative ? _cont(left, right) : !_cont(left, right)
  if (operator === 'match')
    return !negative ? _match(left, right) : !_match(left, right)
  if (operator === 'regex')
    return !negative ? _regex(left, right) : !_regex(left, right)
  if (operator === 'include')
    return !negative ? _include(left, right) : !_include(left, right)
  if (operator === 'true') return !negative ? _true(left) : !_true(left)
  if (operator === 'false') return !negative ? _false(left) : !_false(left)
  if (operator === 'null') return !negative ? _null(left) : !_null(left)
  return false
}

const _eq = (left: ValueType, right: PatternType) =>
  Number(left) === Number(right)
const _lt = (left: ValueType, right: PatternType) =>
  Number(left) < Number(right)
const _lteq = (left: ValueType, right: PatternType) =>
  Number(left) <= Number(right)
const _gt = (left: ValueType, right: PatternType) =>
  Number(left) > Number(right)
const _gteq = (left: ValueType, right: PatternType) =>
  Number(left) >= Number(right)
const _start = (left: ValueType, right: PatternType) =>
  `${left}`.startsWith(`${right}`)
const _end = (left: ValueType, right: PatternType) =>
  `${left}`.endsWith(`${right}`)
const _cont = (left: ValueType, right: PatternType) =>
  `${left}`.includes(`${right}`)
const _match = (left: ValueType, right: PatternType) => left === right
const _regex = (left: ValueType, right: PatternType) =>
  new RegExp(`${right}`).test(`${left}`)
const _include = (left: ValueType, right: PatternType) =>
  Array.isArray(left) && left.includes(right)
const _true = (left: ValueType) => left === true
const _false = (left: ValueType) => left === false
const _null = (left: ValueType) => left === null
