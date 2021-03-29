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
        style={{
          content: { ...customStyles.content, height: '100%', width: '100%' }
        }}
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
              position: absolute !important;
              bottom: 16px !important;
              right: 16px !important;
              height: 700px;
              width: 400px;
              padding: 0px !important;
              background-color: white !important;
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
    height: 700,
    width: 400,
    inset: 'inherit',
    backgroundColor: 'white',
    zIndex: 100,
    padding: 0
  }
}
