import { Closer, JobScript, Proposal } from '@botui/types'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import TextFields from '@material-ui/icons/TextFields'
import Image from '@material-ui/icons/Image'
import Person from '@material-ui/icons/Person'
import Home from '@material-ui/icons/Home'
import Phone from '@material-ui/icons/Phone'
import Cake from '@material-ui/icons/Cake'
import AlternateEmail from '@material-ui/icons/AlternateEmail'
import LibraryAddCheck from '@material-ui/icons/LibraryAddCheck'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import ListIcon from '@material-ui/icons/List'
import CallSplit from '@material-ui/icons/CallSplit'
import Code from '@material-ui/icons/Code'
import FlashOn from '@material-ui/icons/FlashOn'
import ShortText from '@material-ui/icons/ShortText'
import WrapText from '@material-ui/icons/WrapText'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { FC, useEffect, useState } from 'react'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import {
  FormBirthDayEditForm,
  FormCustomCheckboxEditForm,
  FormCustomInputEditForm,
  FormCustomRadioGroupEditForm,
  FormCustomSelectEditForm,
  FormCustomTextareaEditForm,
  FormNameEditForm
} from './FormEfitForm'
import { MessageEditForm } from './MessageEditForm'
import {
  closerTemplate,
  formMessageTemplate,
  imageMessageTemplate,
  relayerTemplate,
  skipperTemplate,
  stringMessageTemplate
} from '../../../Create/proposalTemplates'
import { SkipperEditForm } from './SkipperEditForm'
import { CustomScriptEditForm, FormPushEditForm } from './RelayerEditForm'
import {
  CustomScriptOnCloseEditForm,
  FormPushOnCloseEditForm,
  NoJobOnCloseEditForm,
  StoreOnCloseEditForm
} from './CloserEditForm'
import { ImageEditForm } from './ImageEditForm'

interface ProposalItemSelectListProps {
  submitter: (proposal: Proposal) => void
}

export const ProposalItemSelectList: FC<ProposalItemSelectListProps> = ({
  submitter
}) => {
  const [selected, setSelected] = useState<null | string>(null)

  useEffect(() => {
    if (selected === 'formAddress') {
      submitter(formMessageTemplate({ type: 'FormAddress', status: {} }))
      setSelected(null)
    }
    if (selected === 'formTel') {
      submitter(formMessageTemplate({ type: 'FormTel', status: {} }))
      setSelected(null)
    }
    if (selected === 'formEmail') {
      submitter(formMessageTemplate({ type: 'FormEmail', status: {} }))
      setSelected(null)
    }
  }, [submitter, selected])

  return (
    <>
      <List subheader={<ListSubheader>???????????????</ListSubheader>}>
        <ListItem button onClick={() => setSelected('message')}>
          <ListItemIcon>
            <TextFields />
          </ListItemIcon>
          <ListItemText primary="???????????????????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('image')}>
          <ListItemIcon>
            <Image />
          </ListItemIcon>
          <ListItemText primary="????????????" />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>????????????</ListSubheader>}>
        <ListItem button onClick={() => setSelected('formName')}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="??????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formAddress')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="??????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formBirthDay')}>
          <ListItemIcon>
            <Cake />
          </ListItemIcon>
          <ListItemText primary="????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formTel')}>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formEmail')}>
          <ListItemIcon>
            <AlternateEmail />
          </ListItemIcon>
          <ListItemText primary="?????????????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomRadioGroup')}>
          <ListItemIcon>
            <RadioButtonChecked />
          </ListItemIcon>
          <ListItemText
            primary="??????????????????????????????"
            secondary="???????????????????????????????????????"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomCheckbox')}>
          <ListItemIcon>
            <LibraryAddCheck />
          </ListItemIcon>
          <ListItemText
            primary="????????????????????????????????????"
            secondary="?????????????????????????????????"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomSelect')}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText
            primary="????????????????????????"
            secondary="??????????????????????????????"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomInput')}>
          <ListItemIcon>
            <ShortText />
          </ListItemIcon>
          <ListItemText
            primary="???????????????????????????"
            secondary="???????????????????????????"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomTextarea')}>
          <ListItemIcon>
            <WrapText />
          </ListItemIcon>
          <ListItemText
            primary="?????????????????????????????????"
            secondary="??????????????????????????????????????????"
          />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>????????????</ListSubheader>}>
        <ListItem button onClick={() => setSelected('skipper')}>
          <ListItemIcon>
            <CallSplit />
          </ListItemIcon>
          <ListItemText primary="??????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('customScript')}>
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText primary="???????????????????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formPush')}>
          <ListItemIcon>
            <FlashOn />
          </ListItemIcon>
          <ListItemText primary="?????????????????????" />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>?????????</ListSubheader>}>
        <ListItem button onClick={() => setSelected('closeNone')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="??????????????????????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('closeCustomScript')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="??????????????????????????????????????????????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('closeStore')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="???????????????????????????????????????" />
        </ListItem>
        <ListItem button onClick={() => setSelected('closeFormPush')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="????????????????????????????????????" />
        </ListItem>
      </List>
      <ProposalDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        padding
      >
        {selected === 'message' && (
          <MessageEditForm
            proposal={stringMessageTemplate('?????????????????????')}
            submitter={submitter}
          />
        )}
        {selected === 'image' && (
          <ImageEditForm
            proposal={imageMessageTemplate()}
            submitter={submitter}
          />
        )}
        {selected === 'formName' && (
          <FormNameEditForm
            proposal={formMessageTemplate({
              type: 'FormName',
              status: { kana: true, kanaType: 'katakana' }
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formBirthDay' && (
          <FormBirthDayEditForm
            proposal={formMessageTemplate({
              type: 'FormBirthDay',
              status: { paddingZero: false }
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomRadioGroup' && (
          <FormCustomRadioGroupEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomRadioGroup',
              status: {},
              name: 'radioButtonQuestion',
              inputs: [
                { title: '?????????A', value: 'A' },
                { title: '?????????B', value: 'B' },
                { title: '?????????C', value: 'C' }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomCheckbox' && (
          <FormCustomCheckboxEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomCheckbox',
              status: {},
              name: 'checkboxQuestion',
              required: true,
              inputs: [
                { title: '?????????A', value: 'A' },
                { title: '?????????B', value: 'B' },
                { title: '?????????C', value: 'C' }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomSelect' && (
          <FormCustomSelectEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomSelect',
              status: {},
              selects: [
                {
                  name: 'selectQuestion',
                  title: '??????1',
                  options: [
                    { label: '?????????A', value: 'A' },
                    { label: '?????????B', value: 'B' },
                    { label: '?????????C', value: 'C' }
                  ]
                }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomInput' && (
          <FormCustomInputEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomInput',
              status: {},
              inputs: [{ name: 'customInput', type: 'text', title: '????????????' }]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomTextarea' && (
          <FormCustomTextareaEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomTextarea',
              status: {},
              name: 'customTextarea',
              required: false
            })}
            submitter={submitter}
          />
        )}
        {selected === 'skipper' && (
          <SkipperEditForm
            proposal={skipperTemplate({
              skipNumber: 1,
              logic: 'and',
              conditions: [
                {
                  key: 'someKey',
                  negative: false,
                  operator: 'match',
                  pattern: '????????????'
                }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'customScript' && (
          <CustomScriptEditForm
            proposal={relayerTemplate({ job: 'script' } as JobScript)}
            submitter={submitter}
          />
        )}
        {selected === 'formPush' && (
          <FormPushEditForm
            proposal={relayerTemplate({
              job: 'formPush',
              formSelector: '#form',
              ajax: false,
              dataMapper: [
                { from: 'familyName', to: 'sei', custom: false },
                { from: 'firstName', to: 'mei', custom: false }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'closeNone' && (
          <NoJobOnCloseEditForm
            proposal={closerTemplate({ job: 'none', notify: true })}
            submitter={submitter}
          />
        )}
        {selected === 'closeCustomScript' && (
          <CustomScriptOnCloseEditForm
            proposal={closerTemplate({ job: 'script', notify: true } as Closer)}
            submitter={submitter}
          />
        )}
        {selected === 'closeStore' && (
          <StoreOnCloseEditForm
            proposal={closerTemplate({ job: 'store', notify: true })}
            submitter={submitter}
          />
        )}
        {selected === 'closeFormPush' && (
          <FormPushOnCloseEditForm
            proposal={closerTemplate({
              job: 'formPush',
              notify: true,
              formSelector: '#form',
              ajax: false,
              dataMapper: [
                { from: 'familyName', to: 'sei', custom: false },
                { from: 'firstName', to: 'mei', custom: false }
              ]
            })}
            submitter={submitter}
          />
        )}
      </ProposalDrawer>
    </>
  )
}
