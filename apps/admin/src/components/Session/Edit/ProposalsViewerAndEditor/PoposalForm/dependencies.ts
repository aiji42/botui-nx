import { useCallback, useMemo } from 'react'
import { useProposals } from '../ProposalRow/ProposalsContext'
import { Proposal } from '@botui/types'
import { useFormState } from 'react-final-form'
export const useProposalValueNames = () => {
  const proposals = useProposals()
  const keys = useMemo(() => {
    return proposals.reduce<string[]>((res, proposal) => {
      if (proposal.type !== 'message' || proposal.data.content.type !== 'form')
        return res
      if (proposal.data.content.props.type === 'FormName')
        return [
          ...res,
          'familyName',
          'firstName',
          'familyNameKana',
          'firstNameKana'
        ]
      if (proposal.data.content.props.type === 'FormAddress')
        return [
          ...res,
          'postalCode',
          'prefecture',
          'prefectureId',
          'city',
          'street',
          'building'
        ]
      if (proposal.data.content.props.type === 'FormTel') return [...res, 'tel']
      if (proposal.data.content.props.type === 'FormEmail')
        return [...res, 'email']
      if (proposal.data.content.props.type === 'FormBirthDay')
        return [...res, 'birthdayYear', 'birthdayMonth', 'birthdayDay']
      return res
    }, [])
  }, [proposals])
  return keys
}

export const useProposalCustomFormValueNames = (
  proposalId?: string | number
) => {
  const proposals = useProposals()
  const keys = useMemo(() => {
    return proposals.reduce<string[]>((res, proposal) => {
      if (proposal.type !== 'message' || proposal.data.content.type !== 'form')
        return res
      if (proposalId === proposal.id) return res
      if (proposal.data.content.props.type === 'FormCustomRadioGroup')
        return [...res, proposal.data.content.props.name]
      if (proposal.data.content.props.type === 'FormCustomCheckbox')
        return [...res, proposal.data.content.props.name]
      if (proposal.data.content.props.type === 'FormCustomSelect')
        return [
          ...res,
          ...proposal.data.content.props.selects.map(({ name }) => name)
        ]
      if (proposal.data.content.props.type === 'FormCustomInput')
        return [
          ...res,
          ...proposal.data.content.props.inputs.map(({ name }) => name)
        ]
      if (proposal.data.content.props.type === 'FormCustomTextarea')
        return [...res, proposal.data.content.props.name]
      return res
    }, [])
  }, [proposalId, proposals])

  return keys
}

export const useProposalValueNameValidator = () => {
  const {
    values: { id }
  } = useFormState<Proposal>()
  const keys = useProposalValueNames()
  const additionalKeys = useProposalCustomFormValueNames(id)
  const validator = useCallback(
    (value) => {
      if ([...keys, ...additionalKeys].includes(value))
        return '他のフォームの値名と重複してします。'
    },
    [additionalKeys, keys]
  )

  return validator
}
