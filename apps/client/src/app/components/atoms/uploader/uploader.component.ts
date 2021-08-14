import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { from, of, Observable, throwError, forkJoin, timer } from 'rxjs'
import { tap, catchError, map, mergeMap, concatMap } from 'rxjs/operators'
import { StorageService } from '~services/firebase/storage.service'
import { AngularFireUploadTask } from '@angular/fire/storage/task'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
import { SubscriptionsDirective } from '~extends/directives/subscriptions.directive'
import { FileService, Type } from '~services/file.service'
import { compress, compressFiles } from '~utils/image-controller'
import { ImageFile, ImageFiles, Preview } from '~types/image-files'

@Component({
  selector: 'app-a-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent extends SubscriptionsDirective implements OnInit {
  @Input() multiple = false
  @Input() disabled = false
  @Input() previewType: Type = 'url'

  @Output() snapshotChanges: EventEmitter<UploadTaskSnapshot> = new EventEmitter<UploadTaskSnapshot>()
  @Output() percentageChanges: EventEmitter<number> = new EventEmitter<number>()
  @Output() changed: EventEmitter<ImageFiles> = new EventEmitter()

  sbj = new BehaviorSubjectClass<FileList>()
  files$ = this.sbj.observable.pipe(
    mergeMap((files) => compressFiles(files)),
    map((files) =>
      Array.from(files as ImageFiles).map((file) => {
        file.preview = this.fSv.preview(file as File, this.previewType)
        return file
      })
    )
  )
  files: ImageFiles = []
  snapshotChanges$: Observable<UploadTaskSnapshot | null> = of(null)
  percentageChanges$: Observable<number | null> = of(null)
  removing = false

  constructor(private sSv: StorageService, private fSv: FileService) {
    super()
  }

  ngOnInit() {
    this.subscriptions.add(
      this.files$.subscribe((files: ImageFiles) => {
        this.files = files
        this.changed.emit(files)
        this.removing = true
        this.subscriptions.add(timer().subscribe(() => (this.removing = false)))
      })
    )
  }

  onChange(e: Event): void {
    this.sbj.next((e.target as HTMLInputElement).files as FileList)
  }

  upload(path: string, name: string = ''): Observable<UploadTaskSnapshot[]> {
    if (!this.files) {
      return throwError('upload file empty')
    }
    const count = this.files.length
    const tasks = this.files.map((file, i) => {
      const filename = count === 1 || !name ? name : `${name}_${i + 1}`
      return this.sSv.upload(file, path, { filename })
    })
    if (!tasks.length) {
      return throwError('upload file empty')
    }
    this.__watchState(tasks)
    return forkJoin(tasks.map((task) => from(task)))
  }

  // TODO 利用する際にブラッシュアップ
  private __watchState(tasks: AngularFireUploadTask[]) {
    tasks.forEach((task) => {
      this.subscriptions.add(
        task.snapshotChanges().subscribe((state) => {
          this.snapshotChanges.emit(state)
        })
      )
      this.subscriptions.add(
        task.percentageChanges().subscribe((percentage) => {
          this.percentageChanges.emit(percentage)
        })
      )
    })
  }
}
