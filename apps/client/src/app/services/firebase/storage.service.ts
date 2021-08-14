import { Injectable } from '@angular/core'
import { Observable, of, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import firebase from 'firebase/app'
import { environment } from '~env'
import { BehaviorSubjectClass } from '~utils/behavior-subject.class'
// import { UploadTask, UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import * as storage from '@angular/fire/storage/interfaces'
import { uuidV1, uuidV5 } from '~utils/uuid'

export type Bucket = 'default' | 'tmp'
const BUCKETS = {
  default: environment.firebaseConfig.storageBucket,
  // tmp: environment.firebaseConfig.tmpStorageBucket,
}

interface Options {
  bucket?: Bucket
  filename?: string
}

interface Task extends firebase.storage.UploadTask {
  snapshotChanges: () => Observable<storage.UploadTaskSnapshot>
  percentageChanges: () => Observable<number>
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private afStorage: AngularFireStorage) {}

  // post() {
  //   this.storage.storage
  //     .ref('angular.png')
  //     .getDownloadURL()
  //     .then((url) => {
  //       const img = <HTMLInputElement>document.getElementById('image')
  //       img.setAttribute('src', url)
  //     })
  // }

  // upload(f: File, path: string, o: Options): AngularFireUploadTask | null {
  // upload(f: File, path: string, o: Options): Task | null {
  //   const names = f.name.split('.')
  //   const extension = names.pop()
  //   const filename = o.filename || names.join('.')
  //   const bucket = BUCKETS[o.bucket || 'default']
  //   if (!bucket) {
  //     return null
  //   }
  //   const task = this.afStorage.storage.app.storage(bucket).ref(path).child(`${filename}.${extension}`).put(f) as Task
  //   const stateSub = new BehaviorSubjectClass<firebase.storage.UploadTaskSnapshot>()
  //   const state$: Observable<UploadTaskSnapshot> = stateSub.observable
  //   const percentage$: Observable<number> = state$.pipe(map((state) => this.percent(state)))
  //   task.on(firebase.storage.TaskEvent.STATE_CHANGED, (state) => {
  //     stateSub.next(state)
  //   })
  //   task.snapshotChanges = () => state$
  //   task.percentageChanges = () => percentage$
  //   return task
  // }

  upload(f: File, path: string, o: Options): AngularFireUploadTask {
    const names = f.name.split('.')
    const extension = names.pop()
    const filename = o.filename || uuidV5(names.join('.'), uuidV1())
    return this.afStorage.upload(`${path}/${filename}.${extension}`, f)
  }

  // percent(state: firebase.storage.UploadTaskSnapshot): number {
  //   return (state.bytesTransferred / state.totalBytes) * 100
  // }
}
