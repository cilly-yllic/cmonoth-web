import { Injectable } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { Observable, from } from 'rxjs'

export interface SlackData {
  type: 'check'
  url: string
  username: string
  target: string
}

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private fns: AngularFireFunctions) {}

  run<R = any>(name: string, data: any = {}): Observable<R> {
    return from(this.fns.httpsCallable<any, R>(name)(data).toPromise())
  }

  slack(data: SlackData) {
    return this.run('calls-post-slackNotify', data)
  }

  generateApiKey(suffix: string, params: any): Observable<any> {
    return this.run(`calls-post-algolia-generateSecuredApiKeys-${suffix}`, params)
  }
}
