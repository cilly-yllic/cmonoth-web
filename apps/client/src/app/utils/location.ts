import { GUEST_PATHS } from '~configs'

const location = window.location
export const domain: string = location.origin
export const getUrl = (path: string): string => `${domain}/${path.replace(/^\//, '').replace(/\/{2,}/g, '/')}`
export const routingHead = location.pathname.replace(/^\//, '').replace(/^([^\/]+).*/, '$1')
export const isGuestPage = GUEST_PATHS.some((GUEST_PATH: string) => GUEST_PATH === routingHead)
export const jumpTo = (path: string, open: boolean = false) => {
  if (open) {
    window.open(path)
  } else {
    location.href = path
  }
}
