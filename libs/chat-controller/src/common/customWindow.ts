type Choice = Array<{ value: string; label: string }>

export type CustomChoice = Record<
  string,
  Choice
>
export type CustomMessage = Record<string, string>

export interface CustomWindow extends Window {
  botui?: {
    setCustomChoice?: (key: string, data: Choice) => void
    setCustomMessage?: (key: string, data: string) => void
    openChat?: () => void
  }
  _botui?: {
    customChoice?: CustomChoice
    customMessage?: CustomMessage
  }
}
