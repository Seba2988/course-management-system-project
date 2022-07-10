import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  newStudentForm: FormGroup;
  message: string = null;
  constructor(
    private router: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.newStudentForm = new FormGroup(
      {
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!/@#\$%\^&\*]).{8,}$/
          ),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!/@#\$%\^&\*]).{8,}$/
          ),
        ]),
        dateOfBirth: new FormControl(null, [
          Validators.required,
          this.DoBValidator,
        ]),
        address: new FormControl(null, Validators.required),
      },
      this.passwordComparer
    );
  }

  onSubmit() {
    if (!this.newStudentForm.valid) return;
    const student = this.newStudentForm.value;
    this.studentsService.newStudent(student).subscribe({
      next: () => {
        this.message = 'The new student has been added';
      },
      error: (err) => {
        console.log(err);
        this.message = 'Error!';
      },
    });
  }

  DoBValidator(control: AbstractControl): ValidationErrors | null {
    const minDate = new Date(new Date().getTime() - 567648000000);
    const controlDate = new Date(control.value);
    if (controlDate > minDate) return { ageError: control.value };
    return null;
  }
  passwordComparer(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    console.log(password);
    console.log(confirmPassword);
    if (confirmPassword !== password)
      return { passwordComparisonError: fg.value };
    return null;
  }
}
