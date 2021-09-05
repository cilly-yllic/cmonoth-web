import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { RouterService } from '~services/router.service'
import { TreesService } from '~services/db/client/project/trees.service'

@Injectable({
  providedIn: 'root',
})
export class TreeGuard implements CanActivate {
  constructor(private routerSv: RouterService, private treesSv: TreesService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }

  check(route: ActivatedRouteSnapshot, url: string): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.treesSv.getOne(route.params.projectId, route.params.treeId).pipe(
      mergeMap((tree) => {
        if (!tree) {
          return this.routerSv.clientParseUrl(`projects/${route.params.projectId}`)
        }
        return of(true)
      })
    )
  }
}
