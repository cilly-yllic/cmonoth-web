import { Injectable } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { getFileBlob } from '~utils/image-controller'

// export type Preview = SafeUrl

// interface WindowIf extends Window {
//   URL: URL
// }

export type Type = 'url' | 'style'

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private sanitizer: DomSanitizer) {}

  preview(file: File, type: Type = 'url'): SafeUrl {
    const blob = getFileBlob(file)
    switch (type) {
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(`url(${blob})`)
      case 'url':
      default:
        return this.sanitizer.bypassSecurityTrustUrl(blob)
    }
  }
}
