import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
export type Preview = SafeUrl

export interface Aspects {
  width: number
  height: number
}

interface Original {
  preview?: Preview
  aspects?: Aspects
}

export interface ImageFile extends File {
  preview?: Preview
  aspects?: Aspects
  original?: Original
}

export type ImageFiles = ImageFile[]
