import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/models/Course.model';
import { StudentInCourse } from 'src/app/shared/models/StudentInCourse.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  course: Course;
  courseSub: Subscription;
  courseId: string;
  redirectUrl: string = '/professors/courses';
  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.courseId = url[1].path;
    });
    this.courseSub = this.coursesService
      .getCourseById(this.courseId)
      .subscribe({
        next: (response: any) => {
          this.course = response.result;
        },
        error: (err: any) => {
          this.modalService.openModal(this.redirectUrl, err.error.message);
        },
      });
  }

  onDeleteCourse() {
    this.coursesService.deleteCourse(this.courseId).subscribe({
      next: (response: any) => {
        this.modalService.openModal(this.redirectUrl, response.result);
      },
      error: (errMess) => {
        console.log(errMess);
        this.modalService.openModal(this.redirectUrl, errMess.error.message);
      },
    });
  }

  onDeleteStudent(student: StudentInCourse) {
    const studentId = student.id;
    this.coursesService
      .deleteStudentFromCourse(this.courseId, studentId)
      .subscribe({
        next: (response) => {
          console.log(response);
          location.reload();
        },
        error: (err) => {
          console.log(err);
          this.modalService.openModal(this.redirectUrl, err.error.message);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
