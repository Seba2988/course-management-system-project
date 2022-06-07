import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  newCourseForm: FormGroup;
  message: string = null;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.newCourseForm = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        startingDate: new FormControl(null, [Validators.required]),
        endingDate: new FormControl(null, [Validators.required]),
        day: new FormControl(null, [Validators.required]),
        hour: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^([8-9]|0[8-9]|1[0-9]|2[0]):([0-5]?[0-9])$/),
        ]),
      },
      this.endingDateValidator
    );
  }

  onSubmit() {
    if (!this.newCourseForm.valid) return;
    const course = this.newCourseForm.value;
    this.coursesService.newCourse(course).subscribe({
      next: () => {
        this.message = 'The new course has been added';
      },
      error: () => {
        this.message = 'Error!';
      },
    });
  }

  endingDateValidator(fg: FormGroup): ValidationErrors | null {
    const endingDate = new Date(fg.get('endingDate').value);
    const startingDate = new Date(fg.get('startingDate').value);

    if (endingDate <= startingDate) return { endingError: fg.value };
    return null;
  }
}
