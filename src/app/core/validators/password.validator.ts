import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumbers = /[0-9]+/.test(password);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumbers;

    return passwordValid ? null : { inValidPassword: true };
  };
}
