import { Proposal, Session } from '@botui/types'
import { AllHTMLAttributes, FC, useCallback, useState } from 'react'
import { useFormState, useForm } from 'react-final-form'
import { Grid, makeStyles, IconButton, Box } from '@material-ui/core'
import { ImportExport, AddCircle } from '@material-ui/icons'
import { SingleColumnRow } from './ProposalRow/SingleColumnRow'
import { SingleColumn } from './ProposalRow/SingleCulmn'
import { ProposalDrawer } from './ProposalDrawer/ProposalDrawer'
import { MessageEditForm } from './PoposalForm/MessageEditForm'
import { ProposalItemSelectList } from './PoposalForm/ProposalItemSelectList'
import { FormRow } from './ProposalRow/FormRow'
import { MessageRow } from './ProposalRow/MessageRow'

const ProposalViewer: FC = () => {
  const {
    values: { proposals }
  } = useFormState<Session>()
  const { change } = useForm<Session>()
  const makeUpdater = useCallback(
    (id: Proposal['id']) => {
      return (newProposal: Proposal) => {
        change(
          'proposals',
          proposals.map((proposal) =>
            proposal.id === id ? newProposal : proposal
          )
        )
      }
    },
    [change, proposals]
  )

  return (
    <Grid container>
      <Grid container item xs={12} lg={8}>
        {proposals.map((proposal) => {
          if (
            proposal.type === 'message' &&
            proposal.data.content.type === 'string'
          )
            return (
              <MessageRow
                proposal={proposal}
                updateProposal={makeUpdater(proposal.id)}
                key={proposal.id}
              />
            )
          if (
            proposal.type === 'message' &&
            proposal.data.content.type === 'form'
          )
            return (
              <FormRow
                proposal={proposal}
                updateProposal={makeUpdater(proposal.id)}
                key={proposal.id}
              />
            )
          return <RelayerRow key={proposal.id} />
        })}
      </Grid>
      <Grid container item xs={false} lg={4} />
    </Grid>
  )
}

const useStyle = makeStyles((theme) => ({
  sidePanel: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(10)
  }
}))

const RelayerRow: FC = ({ children }) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)
  const classes = useStyle()
  return (
    <>
      <SingleColumnRow topTool={<EdgeTool />} bottomTool={<EdgeTool />}>
        <SingleColumn onClick={handleEditig}>{children}</SingleColumn>
      </SingleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig}>
        <Box className={classes.sidePanel}>
          <MessageEditForm />
        </Box>
      </ProposalDrawer>
    </>
  )
}

const EdgeTool: FC<AllHTMLAttributes<HTMLDivElement>> = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div {...props}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <AddCircle />
        </IconButton>
        <IconButton size="small">
          <ImportExport />
        </IconButton>
      </div>
      <ProposalDrawer open={open} onClose={() => setOpen(false)}>
        <ProposalItemSelectList />
      </ProposalDrawer>
    </>
  )
}

export default ProposalViewer
