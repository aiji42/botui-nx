import {
  FC,
  useState,
  MouseEvent,
  useCallback,
  useMemo,
  MouseEventHandler,
  forwardRef
} from 'react'
import {
  Menu,
  MenuItem,
  Fab,
  FabProps,
  StyledComponentProps,
  Typography,
  Box
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import { useProposals } from '../ProposalRow/ProposalsContext'

interface NameKeySelectorProps extends Partial<FabProps> {
  onSelected: (val: string) => void
}

export const NameKeySelector: FC<NameKeySelectorProps> = ({
  onSelected,
  children,
  ...res
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])
  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])
  const handleClickMenu = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      onSelected(e.currentTarget.dataset.value ?? '')
      handleClose()
    },
    [handleClose, onSelected]
  )

  return (
    <>
      <Fab {...res} color="primary" onClick={handleClick} size="small">
        <Add fontSize="small" />
        {children}
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <DefaultMenueItems onClick={handleClickMenu} />
      </Menu>
    </>
  )
}

interface DefaultMenueItemsProps {
  onClick: MouseEventHandler<HTMLLIElement>
}

const items = [
  { form: '氏名フォーム', name: '姓', value: 'familyName' },
  { form: '氏名フォーム', name: '名', value: 'firstName' },
  { form: '氏名フォーム', name: '姓(よみ)', value: 'familyNameKana' },
  { form: '氏名フォーム', name: '名(よみ)', value: 'firstNameKana' },
  { form: '住所フォーム', name: '郵便番号', value: 'postalCode' },
  { form: '住所フォーム', name: '都道府県', value: 'prefecture' },
  { form: '住所フォーム', name: '都道府県ID', value: 'prefectureId' },
  { form: '住所フォーム', name: '市区町村', value: 'city' },
  { form: '住所フォーム', name: '番地', value: 'street' },
  { form: '住所フォーム', name: '建物名・部屋番号', value: 'building' },
  { form: '電話番号フォーム', name: '電話番号', value: 'tel' },
  { form: 'メールアドレスフォーム', name: 'メールアドレス', value: 'email' },
  { form: '生年月日フォーム', name: '誕生年', value: 'birthdayYear' },
  { form: '生年月日フォーム', name: '誕生月', value: 'birthdayMonth' },
  { form: '生年月日フォーム', name: '誕生日', value: 'birthdayDay' }
]

const DefaultMenueItems = forwardRef<
  StyledComponentProps['innerRef'],
  DefaultMenueItemsProps
>(({ onClick }, ref) => {
  const proposals = useProposals()
  const keys = useMemo(() => {
    return proposals.reduce((res, proposal) => {
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
  const additionalKeys = useMemo(() => {
    return proposals.reduce((res, proposal) => {
      if (proposal.type !== 'message' || proposal.data.content.type !== 'form')
        return res
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
  }, [proposals])

  return (
    <>
      {items.map(({ value, name, form }) => (
        <MenuItem
          innerRef={ref}
          key={value}
          onClick={onClick}
          data-value={value}
          disabled={!keys.includes(value)}
        >
          {name}
          {!keys.includes(value) && (
            <Box marginLeft={1}>
              <Typography variant="caption">
                {form}が使用されていません
              </Typography>
            </Box>
          )}
        </MenuItem>
      ))}
      {additionalKeys.map((key) => (
        <MenuItem innerRef={ref} key={key} onClick={onClick} data-value={key}>
          {key}
        </MenuItem>
      ))}
    </>
  )
})
