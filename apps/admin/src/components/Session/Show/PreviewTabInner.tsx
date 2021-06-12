import { VFC } from 'react'
import { FunctionField } from 'react-admin'
import { Session } from '@botui/types'
import { Box } from '@material-ui/core'
import { ChatControllerClient } from '@botui/chat-controller'

export const PreviewTabInner: VFC = () => {
  return (
    <FunctionField<Session>
      source="id"
      label=""
      render={(record) => (
        <Box width={320} height={560} mb={4}>
          <ChatControllerClient
            onClose={noop}
            onComplete={noop}
            preview
            session={record}
          >
            <iframe
              src={`${process.env.NX_PREVIEW_HOST}/session/preview`}
              title="プレビュー"
              width="100%"
              height="100%"
            />
          </ChatControllerClient>
        </Box>
      )}
    />
  )
}

const noop = () => {
  // noop
}
