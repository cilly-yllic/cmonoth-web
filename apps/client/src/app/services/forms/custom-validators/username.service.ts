import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { ReservedClientNamesService } from '~services/db/reserved-client-names.service'

export type Status = '' | 'checked' | 'checking'

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private reservedClientNamesSv: ReservedClientNamesService) { }

  setValidate(status: Subject<Status>): AsyncValidatorFn {
    return (control: AbstractControl) => {
      status.next('checking')
      return this.reservedClientNamesSv.isExists(control.value)
        .pipe(
          map((isExists) => {
            status.next('checked')
            console.log('--- isExists ---', isExists)
            if (!isExists) {
              return null
            }
            return { isNewName: true }
          })
        )
    }
  }
}
