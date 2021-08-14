import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { FunctionsService } from './functions.service'

@Injectable({
  providedIn: 'root',
})
export class CanSignUpService {
  constructor(private functionsSv: FunctionsService) {}

  run(email: string): Observable<boolean> {
    return this.functionsSv.run('calls-get-auth-checkAvailabilitySignUp', { email })
  }
}
