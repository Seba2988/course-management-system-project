import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!/@#\$%\^&\*]).{8,}$/;
  constructor() {}

  passwordComparer(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    if (confirmPassword !== password)
      return { passwordComparisonError: fg.value };
    return null;
  }

  DoBValidator(control: AbstractControl): ValidationErrors | null {
    const minDate = new Date(new Date().getTime() - 567648000000);
    const controlDate = new Date(control.value);
    if (controlDate > minDate) return { ageError: control.value };
    return null;
  }

  atLeastOneFieldNotNullValidator(fg: FormGroup): ValidationErrors | null {
    let isValid: boolean = false;
    Object.values(fg.value).forEach((val: string) => {
      if (val !== null && val.trim() !== '') {
        isValid = true;
      }
    });
    if (isValid) return null;
    return { everyNullError: fg.value };
  }

  endingDateValidator(fg: FormGroup): ValidationErrors | null {
    const endingDate = new Date(fg.get('endingDate').value);
    const startingDate = new Date(fg.get('startingDate').value);

    if (endingDate <= startingDate) return { endingError: fg.value };
    return null;
  }

  reasonOfAbsenceValidator(fg: FormGroup): ValidationErrors | null {
    const isPresent = fg.get('isPresent').value;
    const reasonOfAbsence = fg.get('reasonOfAbsence').value;
    if (
      !isPresent &&
      (reasonOfAbsence == null || reasonOfAbsence.trim().length === 0)
    )
      return { explanationError: fg.value };
    return null;
  }
}
