import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpModel } from 'src/app/shared/models/SignUp.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  newStudentForm: FormGroup;
  redirectUrl: string = '/professors/students';
  constructor(
    private studentsService: StudentsService,
    private modalService: ModalService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.newStudentForm = new FormGroup(
      {
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.validatorsService.passwordRegex),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.validatorsService.passwordRegex),
        ]),
        dateOfBirth: new FormControl(null, [
          Validators.required,
          this.validatorsService.DoBValidator,
        ]),
        address: new FormControl(null, Validators.required),
      },
      this.validatorsService.passwordComparer
    );
  }

  onSubmit() {
    if (!this.newStudentForm.valid) return;
    const student: SignUpModel = this.newStudentForm.value;
    this.studentsService.newStudent(student).subscribe({
      next: () => {
        this.modalService.openModal(
          this.redirectUrl,
          'The new student has been added'
        );
      },
      error: (err) => {
        console.log(err);
        this.modalService.openModal(this.redirectUrl, err.error.message);
      },
    });
  }
}
