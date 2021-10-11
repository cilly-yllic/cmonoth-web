import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { STORAGE } from '~configs'
import { environment } from '~env'

const getEndpoint = () => environment.useEmulators ? 'http://localhost:9199' : STORAGE.ENDPOINT
export const getPath = (snapshot: UploadTaskSnapshot) => {
  const ref = snapshot.ref
  return `${getEndpoint()}/${ref.bucket}/${ref.fullPath}`
}

export const getAllPath = (snapshots: UploadTaskSnapshot[]) => snapshots.map((snapshot) => getPath(snapshot))
