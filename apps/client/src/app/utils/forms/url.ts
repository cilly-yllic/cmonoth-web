import { FormControl, Validators } from '@angular/forms'

import { URL_PATTERN } from '~configs/validate'

export const getUrlFromControl = (isRequired: boolean = false): FormControl => {
  const validatorFns = [Validators.pattern(URL_PATTERN)]
  if (isRequired) {
    validatorFns.push(Validators.required)
  }
  return new FormControl('', validatorFns)
}
