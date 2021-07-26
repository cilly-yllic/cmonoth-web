import firebase from 'firebase/app'

export type fAuth = firebase.User

export interface Auth {
  uid: firebase.User['uid']
  email: firebase.User['email']
  displayName: firebase.User['displayName']
  photoURL: firebase.User['photoURL']
  providerId: firebase.User['providerId']
}
