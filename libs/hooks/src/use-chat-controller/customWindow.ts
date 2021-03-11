export interface CustomWindow extends Window {
  botui?: {
    customChoice?: Record<string, Array<{ value: string; label: string }>>
    customMessage?: Record<string, string>
  }
}
