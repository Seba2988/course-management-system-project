import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/models/Course.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  newCourseForm: FormGroup;
  redirectUrl: string = '/professors/courses';

  constructor(
    private coursesService: CoursesService,
    private modalService: ModalService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.newCourseForm = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        startingDate: new FormControl(null, [Validators.required]),
        endingDate: new FormControl(null, [Validators.required]),
      },
      this.validatorsService.endingDateValidator
    );
  }

  onSubmit() {
    if (!this.newCourseForm.valid) return;
    const course: Course = this.newCourseForm.value;
    course.professorId = JSON.parse(
      sessionStorage.getItem('professorToken')
    ).userId;
    console.log(course);
    this.coursesService.newCourse(course).subscribe({
      next: () => {
        this.modalService.openModal(
          this.redirectUrl,
          'The new course has been added'
        );
      },
      error: (err) => {
        this.modalService.openModal(
          this.redirectUrl,
          err.error.message
            ? err.error.message
            : err.error.errors.StartingDate[0]
        );
      },
    });
  }
}
