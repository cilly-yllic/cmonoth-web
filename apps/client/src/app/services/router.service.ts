import { Injectable } from '@angular/core'
import { Router, NavigationExtras, UrlTree } from '@angular/router'
import { Observable, from } from 'rxjs'
import { isGuestPage, jumpTo } from '~utils/location'
import { GUEST_PATHS } from '~configs'

const isGuest = (path: string): boolean => {
  const headPath = path.replace(/^\//, '').replace(/^([^\/]+).*/, '$1')
  return GUEST_PATHS.some((GUEST_PATH: string) => GUEST_PATH === headPath)
}

const getPageType = (url: string, segment: number) => {
  const paths = url.replace(/^\//, '').split('/')
  return paths.length >= segment ? paths[(segment = 1)] : ''
}

export interface Breadcrumb {
  name: string
  path?: string
}

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  navigate(commands: any[], extras?: NavigationExtras): Observable<boolean> {
    console.log('navigate', commands)
    const path = commands.join()
    if (isGuestPage === isGuest(path)) {
      console.log('isGuestPage', path)
      return from(this.router.navigate(commands, extras))
    } else {
      return from(
        new Promise<boolean>((resolve) => {
          jumpTo(path)
          resolve(true)
        })
      )
    }
  }

  clientNavigate(commands: any[], extras?: NavigationExtras): Observable<boolean> {
    return this.navigate(commands, extras)
  }

  parseUrl(path: string = ''): UrlTree | boolean {
    if (isGuestPage === isGuest(path)) {
      return this.router.parseUrl(path)
    } else {
      jumpTo(path)
      return false
    }
  }

  get breadcrumbs(): Breadcrumb[] {
    const paths = this.router.url.replace(/^\//, '').split(/\//g)
    paths.pop()
    return paths.reduce((acc, current, i) => {
      let path = `/${current}`
      if (i > 0) {
        path = `${acc[acc.length - 1].path}/${current}`
      }
      acc.push({ path, name: current })
      return acc
    }, [] as Breadcrumb[])
  }
}
