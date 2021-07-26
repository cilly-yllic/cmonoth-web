import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { STORAGE } from '~configs'
export const getPath = (snapshot: UploadTaskSnapshot) => {
  const ref = snapshot.ref
  return `${STORAGE.ENDPOINT}/${ref.bucket}/${ref.fullPath}`
}

export const getAllPath = (snapshots: UploadTaskSnapshot[]) => snapshots.map((snapshot) => getPath(snapshot))
