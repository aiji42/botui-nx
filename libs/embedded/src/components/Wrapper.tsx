/** @jsxImportSource @emotion/react */
import React, { FC, forwardRef, ReactElement, Ref, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Modal from 'react-modal'
import { css } from '@emotion/react'

export interface WrapperProps {
  isFull: boolean
  isOpen: boolean
}

export const Wrapper: FC<WrapperProps> = (props) => {
  useEffect(() => {
    Modal.setAppElement(document.querySelector('body'))
  }, [])
  const { isFull, isOpen } = props
  if (isFull)
    return (
      <Modal isOpen={isOpen} style={{ content: { ...customStyles.content, height: '100%', width: '100%' }}}>
        {props.children}
      </Modal>
    )
  return (
    <div>
      <Modal isOpen={isOpen} style={customStyles}>
        {props.children}
      </Modal>
    </div>
  )
}


const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)"
  },
  content: {
    position: "absolute",
    top: "5rem",
    left: "5rem",
    right: "5rem",
    bottom: "5rem",
    backgroundColor: "paleturquoise",
    borderRadius: "1rem",
    padding: "1.5rem"
  }
};
