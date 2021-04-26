import { ProposalMessage } from '@botui/types'
import { FC, useCallback } from 'react'
import { ListItem, ListItemIcon, Box } from '@material-ui/core'
import { Image as ImageIcon } from '@material-ui/icons'
import { DoubleColumnRow } from './DoubleColumnRow'
import { DoubleColumn } from './DoubleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { EdgeTool, LeftTool, RightTool, DeleteTool } from './Tools'
import { useProposalRow } from './dependencies'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'
import { useImageUrl } from '@botui/hooks'
import { ImageEditForm } from '../PoposalForm/ImageEditForm'

interface ImageRowProps {
  isFirst: boolean
  isLast: boolean
  proposal: ProposalMessage
}

export const ImageRow: FC<ImageRowProps> = ({
  isFirst,
  isLast,
  proposal
}) => {
  const [status, helper] = useProposalRow<ProposalMessage>(proposal)
  const switchSide = useCallback(() => {
    helper.update({
      ...proposal,
      data: { ...proposal.data, human: !proposal.data.human }
    })
  }, [helper, proposal])

  if (proposal.data.content.type !== 'image') return null
  return (
    <>
      <DoubleColumnRow
        side={proposal.data.human ? 'right' : 'left'}
        topTool={
          <EdgeTool
            onClickSwitch={!isFirst ? helper.overtakehWithPrev : undefined}
            onClickInsert={helper.startCreatePrev}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={!isLast ? helper.overtakehWithNext : undefined}
            onClickInsert={helper.startCreateNext}
          />
        }
        rightTopTool={<DeleteTool onClick={helper.remove} />}
      >
        <DoubleColumn
          onClick={helper.startEdit}
          leftTool={proposal.data.human && <LeftTool onClick={switchSide} />}
          rightTool={!proposal.data.human && <RightTool onClick={switchSide} />}
        >
          <ListItem id={String(proposal.id)}>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <Box>
              <Image imageKey={proposal.data.content.props.imgKey} />
            </Box>
          </ListItem>
        </DoubleColumn>
      </DoubleColumnRow>
      <ProposalDrawer open={status.editing} onClose={helper.complete} padding>
        <ImageEditForm proposal={proposal} submitter={helper.complete} />
      </ProposalDrawer>
      <ProposalDrawer
        open={status.creatingNext || status.creatingPrev}
        onClose={helper.complete}
      >
        <ProposalItemSelectList submitter={helper.complete} />
      </ProposalDrawer>
    </>
  )
}

interface ImageProps {
  imageKey: string
}

const Image: FC<ImageProps> = (props) => {
  const src = useImageUrl(props.imageKey)
  return <img src={src} alt="illustration" width="100%" height="auto" />
}
