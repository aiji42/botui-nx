export const pushForm = async (
  form: HTMLFormElement,
  init: RequestInit = {}
): Promise<Response> => {
  const fields = new FormData(form)
  const url = new URL(form.getAttribute('action') ?? '', window.location.origin)
  init.headers = new Headers(init.headers)
  if (!init.headers.has('Accept')) {
    init.headers.append(
      'Accept',
      'text/html,application/xhtml+xml,application/xml'
    )
  }

  init.method = form.method
  if (form.method === 'get') {
    fields.forEach((value, name) => {
      if (typeof value === 'string') url.searchParams.set(name, value)
    })
  } else {
    init.body = fields
    init.headers.append('Cache-Control', 'max-age=0')
  }

  return fetch(url.toString(), init)
}
