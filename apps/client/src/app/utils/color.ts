import { hexdec } from '~utils/converter/string'

export const getLuminance = (code: string): number =>
  (hexdec(code.substr(1, 2)) * 0.299 + hexdec(code.substr(3, 2)) * 0.587 + hexdec(code.substr(5, 2)) * 0.114) / 2.55

export const isDarker = (code: string): boolean => getLuminance(code) < 50
