import { FC, MouseEventHandler } from 'react'
import styled from '@emotion/styled'

const Div = styled.div({
  position: 'fixed',
  zIndex: 100,
  bottom: 16,
  right: 16,
  backgroundColor: '#3f51b5',
  width: 64,
  height: 64,
  borderRadius: 32,
  cursor: 'pointer',
  backgroundImage: 'none', // reset style
  boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)'
})

const Icon = styled.div({
  width: 36,
  height: 26,
  top: 18,
  left: 14,
  backgroundColor: 'white',
  borderRadius: 4,
  position: 'relative',
  ':after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 0,
    height: 0,
    right: 10,
    bottom: -10,
    borderLeft: '10px solid transparent',
    borderRight: '2px solid transparent',
    borderTop: '10px solid white'
  }
})

export interface FabProps {
  isOpen: boolean
  onClick: MouseEventHandler
}

export const Fab: FC<FabProps> = (props) => {
  const { isOpen, onClick } = props
  if (isOpen) return null
  return (
    <Div onClick={onClick}>
      <Icon />
    </Div>
  )
}
