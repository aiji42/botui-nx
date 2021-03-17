import React, { FC, useEffect, useRef } from 'react'
import { useChatConfigContext, MessageContextProvider, useChatController, useMessageContext } from '@botui/hooks'
import { css } from '@emotion/react'
import { MessageWrapper } from './MessageWrapper'
import { Message } from './Message'
import { ProposalCloser, ProposalRelayer, ProposalSkipper, Session, Skipper, SkipperCondition, SkipperConditionOperator } from '@botui/types'
import { addEntry } from '@botui/api'
import { requestNotify } from '../../../../pages/api/notify'

const style = {
  root: css({
    padding: '5px 15px 150px 15px',
    overflowY: 'scroll',
    msOverflowStyle: 'none', // スクロールバーを隠す(IE、Edge)
    scrollbarWidth: 'none', // スクロールバーを隠す(Firefox)
    '&::-webkit-scrollbar': {
      display: 'none' // スクロールバーを隠す(Chrome、Safari)
    }
  })
}

export const Body: FC = (props) => {
  const { proposals } = useChatController()

  return (
    <div css={style.root}>
      {proposals.map((proposal) => proposal.type === 'message' ? (
        <MessageContextProvider
          key={proposal.id}
          id={proposal.id}
          message={proposal.data}
        >
          <MessageWrapper>
            <Message />
          </MessageWrapper>
        </MessageContextProvider>
      ) : null)
    }
    </div>
  )
}

const Relayer: FC<{ proposal: ProposalRelayer }> = ({ proposal }) => {
  const { formPush, evalFunction } = useChatController()
  const { handleUpdate } = useMessageContext()
  const mounted = useRef(true)
  useEffect(() => {
    if (!mounted.current) return
    if (proposal.data.job === 'script') {
      // FIXME: value
      evalFunction(proposal.data.script, {}).then(handleUpdate)
    }
    if (proposal.data.job === 'webhook') {
      // FIXME:
      handleUpdate()
    }
    if (proposal.data.job === 'formPush') {
      // FIXME: value
      // NOTE: ページ遷移により強制的にチャット終了の可能性がある
      formPush(proposal.data, {}).then(handleUpdate)
    }
    return () => { mounted.current = false }
  }, [evalFunction, formPush, handleUpdate, proposal.data])

  return null
}

const Closer: FC<{ proposal: ProposalCloser }> = ({ proposal }) => {
  const { formPush, evalFunction } = useChatController()
  const { handleUpdate } = useMessageContext()
  const mounted = useRef(true)
  useEffect(() => {
    if (!mounted.current) return
    if (proposal.data.job === 'store') {
      // FIXME: value
      // FIXME: session
      addEntry({ owner: '', sessionId: '', inputs: {} })
    }
    if (proposal.data.job === 'script') {
      // FIXME: value
      evalFunction(proposal.data.script, {}).then(handleUpdate)
    }
    if (proposal.data.job === 'webhook') {
      // TODO:
      handleUpdate()
    }
    if (proposal.data.notify) {
      // FIXME: Value, session
      requestNotify({}, {} as Session)
    }
    if (proposal.data.job === 'formPush') {
      // FIXME: value
      // NOTE: ページ遷移により強制的にチャット終了の可能性がある
      formPush(proposal.data, {}).then(handleUpdate)
    }
    return () => { mounted.current = false }
  }, [evalFunction, formPush, handleUpdate, proposal.data])

  return null
}

const Skipper: FC<{ proposal: ProposalSkipper }> = ({ proposal }) => {
  const mounted = useRef(true)
  useEffect(() => {
    if (!mounted.current) return
    const skipNum = skipperEvaluate(proposal.data, {})
    // FIXME: update
    return () => { mounted.current = false }
  }, [proposal.data])

  return null
}

export type PatternType = SkipperCondition['pattern']
export type ValueType = PatternType | Array<PatternType>

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
