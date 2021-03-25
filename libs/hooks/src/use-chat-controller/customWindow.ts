export type CustomChoice = Record<
  string,
  Array<{ value: string; label: string }>
>
export type CustomMessage = Record<string, string>

export interface CustomWindow extends Window {
  botui?: {
    customChoice?: CustomChoice
    customMessage?: CustomMessage
  }
}
