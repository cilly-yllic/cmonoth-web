import { EventEmitter } from '@angular/core'
import { Subject, throwError, forkJoin, combineLatest, BehaviorSubject, Observable, of, from } from 'rxjs'
import { tap, skipWhile, mergeMap, map } from 'rxjs/operators'
import Compressor from 'compressorjs'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ImageFile, ImageFiles, Preview, Aspects } from '~types/image-files'

// export const MAX_FILE_SIZE = 10000000 // 10MB
export const MAX_FILE_SIZE = 10000 // 10KB

export const compress = (file: ImageFile) => {
  return from(
    new Promise((result, reject) => {
      if (file.size <= MAX_FILE_SIZE) {
        result(file)
        return
      }
      const { maxWidth, maxHeight } = getRatio(file.original?.aspects || { width: 0, height: 0 })
      const compressor = new Compressor(file, {
        convertSize: Infinity,
        maxWidth,
        maxHeight,
        success: (res: File) => {
          console.warn('success compressing')
          result(res)
        },
        error: (e: Error) => {
          console.error(e.message)
          reject(e)
        },
      })
    })
  )
}

const getRatio = ({ width, height }: { width: number; height: number }) => {
  const rate = (width * height) / MAX_FILE_SIZE
  const sqrt = Math.sqrt(rate)
  return {
    maxWidth: width / sqrt,
    maxHeight: height / sqrt,
  }
}

export const getFileBlob = (file: ImageFile) => URL.createObjectURL(file)

export const compressFiles = (files: FileList) => {
  return forkJoin(
    Array.from(files)
      .filter((file) => !!file)
      .map((file: ImageFile) => {
        return getImageSizeDetail(getFileBlob(file)).pipe(
          map(({ width, height }) => {
            if (!file.original) {
              file.original = {}
            }
            file.original.aspects = {
              width,
              height,
            }
            return file
          }),
          mergeMap((imageFile) => compress(imageFile))
        )
        // return compress(file)
      })
  ).pipe(tap((v) => console.log('combineLatest', v)))
}

export const getImageSizeDetail = (url: SafeUrl): Observable<Aspects> => {
  return from(
    new Promise<Aspects>((result, reject) => {
      const img = new Image()
      img.onload = (e) => {
        const { width, height }: any = e.currentTarget
        result({ width, height })
      }
      img.src = url as any
    })
  )
}
