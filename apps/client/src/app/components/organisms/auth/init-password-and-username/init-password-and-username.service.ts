import { Injectable } from '@angular/core';
import { FunctionsService } from '~services/firebase/functions/functions.service'

@Injectable({
  providedIn: 'root'
})
export class InitPasswordAndUsernameService {

  constructor(private functionsSv: FunctionsService) { }

  updatePassword(password: string, username: string) {
    return this.functionsSv.run('calls-put-auth-initPassword', { password: btoa(password), username: encodeURIComponent(username) })
  }
}
