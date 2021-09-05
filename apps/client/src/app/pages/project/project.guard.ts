import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { RouterService } from '~services/router.service'
import { ProjectsService } from '~services/db/client/projects.service'

@Injectable({
  providedIn: 'root',
})
export class ProjectGuard implements CanActivate {
  constructor(private routerSv: RouterService, private projectsSv: ProjectsService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(next, state.url)
  }

  check(route: ActivatedRouteSnapshot, url: string): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.projectsSv.getOne(route.params.projectId).pipe(
      mergeMap((project) => {
        if (!project) {
          return this.routerSv.clientParseUrl()
        }
        return of(true)
      })
    )
  }
}
