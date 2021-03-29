import React, { FC, MouseEventHandler } from 'react'
import ChatIcon from '@material-ui/icons/ChatBubble'
import styled from '@emotion/styled'

const Div = styled.div({
  position: 'fixed',
  zIndex: 100,
  bottom: 16,
  right: 16,
  backgroundColor: '#da3030',
  width: 64,
  height: 64,
  borderRadius: 32,
  cursor: 'pointer',
  backgroundImage: 'none' // reset style
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
      <ChatIcon fontSize="large" style={{ color: 'white', position: 'absolute', top: 15, left: 15 }} />
    </Div>
  )
}
