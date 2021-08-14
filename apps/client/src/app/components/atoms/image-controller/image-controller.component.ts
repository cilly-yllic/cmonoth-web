import { Component, Input, ViewChild, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { Subject, Subscription, of } from 'rxjs'
import { switchMap, debounceTime, map } from 'rxjs/operators'
import { getAllPath } from '~utils/firebase/storage'
import { isUrlString } from '~utils/types'

import { UploaderComponent } from '~atoms/uploader/uploader.component'
import { ImageFile, ImageFiles, Preview } from '~types/image-files'
// import { URL } from '~validate'

export const getFile = (files: ImageFiles): ImageFile | null => (!!files.length ? files[files.length - 1] : null)

@Component({
  selector: 'app-a-image-controller',
  templateUrl: './image-controller.component.html',
  styleUrls: ['./image-controller.component.scss'],
})
export class ImageControllerComponent implements OnInit {
  @ViewChild(UploaderComponent) uploader!: UploaderComponent

  @Input() dummyPath = ''
  _path = ''
  @Input()
  set path(path: string | undefined | null) {
    this._path = path || ''
    this.backup = path || ''
  }
  get path() {
    return `url(${this._path || this.dummyPath})`
  }

  preview!: Preview | null
  backup = ''

  constructor() {}

  ngOnInit(): void {}

  onChanged(files: ImageFiles) {
    const file = getFile(files)
    this.preview = !!file ? file?.preview || null : null
  }

  public get changed(): boolean {
    return !!this.preview || this._path !== this.backup
  }

  onUndo(e: Event) {
    e.stopPropagation()
    this.path = this.backup
    this.preview = null
  }

  get clearable(): boolean {
    // return URL.reg.test(this._path) || this.changed
    return isUrlString(this._path) || this.changed
  }

  onClear(e: Event) {
    e.stopPropagation()
    this._path = ''
    this.preview = null
  }

  public upload(path: string, filename: string) {
    console.log('upload', path)
    return !!this.preview ? this.uploader.upload(path, filename).pipe(map((tasks) => getAllPath(tasks)[0])) : of(this._path)
  }
}
