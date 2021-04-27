import { FC } from 'react'
import { Field } from 'react-final-form'
import { Grid } from '@material-ui/core'
import { MessageRow } from './ProposalRow/MessageRow'
import { RelayerRow } from './ProposalRow/RelayRow'
import { SkipperRow } from './ProposalRow/SkipperRow'
import { CloserRow } from './ProposalRow/CloserRow'
import { useProposalsEditor } from './dependencies'

const ProposalsViewerAndEditor: FC = () => {
  const [proposals] = useProposalsEditor()
  return (
    <Grid container>
      {/* hidden みたいなもの。この行がないと useForm だけでは変更が伝搬しない */}
      <Field name="proposals">{() => null}</Field>
      <Grid container item xs={12} lg={8}>
        {proposals.map((proposal, index) => {
          if (proposal.type === 'message')
            return (
              <MessageRow
                isFirst={index === 0}
                isLast={proposals.length === index + 1}
                proposal={proposal}
                key={proposal.id}
              />
            )
          if (proposal.type === 'relayer')
            return (
              <RelayerRow
                isFirst={index === 0}
                isLast={proposals.length === index + 1}
                key={proposal.id}
                proposal={proposal}
              />
            )
          if (proposal.type === 'skipper')
            return (
              <SkipperRow
                isFirst={index === 0}
                isLast={proposals.length === index + 1}
                key={proposal.id}
                proposal={proposal}
              />
            )
          if (proposal.type === 'closer')
            return (
              <CloserRow
                isFirst={index === 0}
                isLast={proposals.length === index + 1}
                key={proposal.id}
                proposal={proposal}
              />
            )
          return null
        })}
      </Grid>
      <Grid container item xs={false} lg={4} />
    </Grid>
  )
}

export default ProposalsViewerAndEditor
