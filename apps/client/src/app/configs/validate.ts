// export const URL = {
//   pattern:
//     '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)' +
//     '+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?' +
//     '(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
//   option: 'i',
//   // reg: /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?
//   // (\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/,
//   reg: /^https?:\/\/([a-z\d][a-z\d-]*[a-z\d]\.?)+(\/[\w-+%.~]+)*(\?[\w;&%.~+=-]*)?(#[\w-]*)?$/,
// }

export const ASSETS = '^assets(\\/[\\w-]+)+$'
export const API_RESOURCES = '^(\\/[\\w-]+)+$'
export const URL_PATTERN =
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$'

export const IP = {
  pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}',
  // pattern: '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])[¥.]){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$',
  maxLength: 15,
  minLength: 15,
}

export const SUBDOMAIN = {
  pattern: '^[a-z0-9-_]+$',
  maxLength: 40,
  minLength: 5,
}

export const USERNAME = {
  pattern: '^[a-zA-Z0-9-_]+$',
  maxLength: 20,
  minLength: 4,
}

export const PASSWORD = {
  pattern: '^[a-zA-Z0-9-_!?=.*]+$',
  maxLength: 255,
  minLength: 5,
}

export const YEAR = {
  pattern: '19[0-9]{2}|[2-9][0-9]{3}',
  maxLength: 4,
}

export const MONTH = {
  pattern: '0[1-9]|1[0-2]',
  maxLength: 2,
}

export const DAY = {
  pattern: '0[1-9]|[1-2][0-9]|3[0-1]',
  maxLength: 2,
}

export const HOURS = {
  pattern: '[0-1][0-9]|2[0-4]',
  maxLength: 2,
}

export const MINUTES = {
  pattern: '[0-5][0-9]|60',
  maxLength: 2,
}

export const PURE_NUMBER = /^[0-9]+$/
