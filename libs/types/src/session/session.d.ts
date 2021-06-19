import { Message } from './message'
import { Proposals } from './proposal'

export interface Theme {
  header?: {
    backgroundColor: string
  }
  footer?: {
    backgroundColor: string
  }
  agent?: {
    backgroundColor: string
    color: string
  }
  user?: {
    backgroundColor: string
    color: string
  }
  progressBar?: {
    backgroundColor: string
  }
}

type ImageConfig = {
  provider: string
  key: string
}

export interface Images {
  logo?: ImageConfig
  agent?: string
}

export interface Launcher {
  defaultOpen: boolean
  size: 'full' | 'widget' | 'auto'
  loadScripts?: Array<string>
}

export interface CollaboratorInvitation {
  id: string
  email: string
  sessionId: string
  session: Session | null
}

export interface Session<T = Proposals, U = Theme, V = Images, W = Launcher> {
  id: string
  title: string
  owner: string
  active: boolean
  theme: U
  proposals: T
  images: V
  email: string | null
  launcher: W
  collaboratorInvitations?: { items: Array<CollaboratorInvitation> } | null
  collaborators: string[] | null
  googleAnalyticsId: string | null
}

export interface ChatConfig extends Omit<Session, 'proposals'> {
  messages: Array<Message>
  percentOfProgress: number
  onStart?: () => void
  onClose?: () => void
}
