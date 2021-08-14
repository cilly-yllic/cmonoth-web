import { Injectable } from '@angular/core'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { Client } from '~types/db/clients';
import { BehaviorSubjectClass } from '~utils/behavior-subject.class';

@Injectable({
  providedIn: 'root'
})
export class RouterClientService {

  name$ = new BehaviorSubjectClass<Client['name']>()

  constructor(private router: Router) { }

  get clientName(): Client['name'] {
    const segments = this.router.parseUrl(window.location.pathname).root.children.primary.segments
    if (segments.length < 1) {
      throw Error('router segments is empty')
    }
    const clientName = segments[0].toString()
    if (!clientName) {
      throw Error('clientId is empty')
    }
    this.name$.next(clientName)
    return clientName
  }
}
