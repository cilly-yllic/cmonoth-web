import { FormControl, Validators, AsyncValidatorFn } from '@angular/forms'

import { USERNAME } from '~configs/validate'

export const VALIDATE_KEYS = ['exist', 'checked', 'checking']

export const getUsernameFromControl = (username: string = '', asyncValidatorFns: AsyncValidatorFn[] = []): FormControl =>
  new FormControl(
    username,
    [
      Validators.required,
      Validators.minLength(USERNAME.minLength),
      Validators.maxLength(USERNAME.maxLength),
      Validators.pattern(USERNAME.pattern),
    ],
    asyncValidatorFns
  )
