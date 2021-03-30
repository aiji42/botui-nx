import React, { FC, useEffect } from 'react'
import Modal from 'react-modal'
import { ClassNames } from '@emotion/react'

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
      <Modal
        isOpen={isOpen}
        style={customStyles}
      >
        {props.children}
      </Modal>
    )
  return (
    <ClassNames>
      {({ css }) => (
        <Modal
          isOpen={isOpen}
          style={{ content: { inset: 'unset' } }}
          portalClassName={css`
            .ReactModal__Content {
              bottom: 16px !important;
              right: 16px !important;
              height: 700px;
              width: 400px;
              padding: 0px !important;
              background-color: white !important;
              border: none !important;
              box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
            }
            .ReactModal__Overlay {
              background-color: transparent !important;
            }
          `}
        >
          {props.children}
        </Modal>
      )}
    </ClassNames>
  )
}

const customStyles = {
  content: {
    height: '100%',
    width: '100%',
    inset: 'inherit',
    backgroundColor: 'white',
    zIndex: 100,
    padding: 0
  }
}
