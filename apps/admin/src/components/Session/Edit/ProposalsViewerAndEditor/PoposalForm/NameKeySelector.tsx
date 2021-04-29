import { FC, useState, MouseEvent, useCallback } from 'react'
import { Menu, MenuItem, Fab, FabProps } from '@material-ui/core'
import Add from '@material-ui/icons/Add'

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
        <MenuItem onClick={handleClickMenu} data-value="familyName">
          氏名:姓
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstName">
          氏名:名
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="familyNameKana">
          氏名:姓(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstNameKana">
          氏名:名(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="postalCode">
          住所:郵便番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="prefecture">
          住所:都道府県
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="prefectureId">
          住所:都道府県ID
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="city">
          住所:市区町村
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="street">
          住所:番地
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="building">
          住所:建物名・部屋番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="tel">
          電話番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="email">
          メールアドレス
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayYear">
          生年月日:年
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayMonth">
          生年月日:月
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayDay">
          生年月日:日
        </MenuItem>
      </Menu>
    </>
  )
}
