import firebase from 'firebase/app'

export type FieldValue = firebase.firestore.FieldValue
export type Timestamp = firebase.firestore.Timestamp
export type GeoPoint = firebase.firestore.GeoPoint

export interface Update {
  updatedAt: FieldValue
}

export interface Create {
  createdAt: FieldValue
}

export interface Get {
  updatedAt?: Timestamp
  createdAt: Timestamp
}
