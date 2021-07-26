import { FormControl, Validators } from '@angular/forms'

export const getEmailFromControl = (): FormControl => new FormControl('', [Validators.required, Validators.email])
