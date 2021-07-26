import { FormControl, Validators } from '@angular/forms'

import { PASSWORD } from '~configs/validate'

export const getPasswordFromControl = (): FormControl =>
  new FormControl('', [
    Validators.required,
    Validators.minLength(PASSWORD.minLength),
    Validators.maxLength(PASSWORD.maxLength),
    Validators.pattern(PASSWORD.pattern),
  ])
