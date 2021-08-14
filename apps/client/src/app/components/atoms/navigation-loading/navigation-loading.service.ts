import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class NavigationLoadingService {
  _lock = false

  constructor() {}

  lock(): void {
    this._lock = true
  }

  unlock(): void {
    this._lock = false
  }

  get isLocked(): boolean {
    return this._lock
  }
}
