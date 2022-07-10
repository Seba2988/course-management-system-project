import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/shared/services/courses.service';
import * as DTO from '../../../../shared/models/DTO.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  course: DTO.Course;
  courseSub: Subscription;
  courseId: string;
  message: string = null;
  redirectUrl: string = null;
  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.courseId = url[1].path;
    });
    this.courseSub = this.coursesService
      .getCourseById(this.courseId)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          // console.log(course.Id);
          this.course = response.result;
        },
        error: (err) => {
          console.log(err);
          this.message = err.error.message;
          this.redirectUrl = 'professors/courses';
          // this.router.navigate(['error'], { relativeTo: this.route });
        },
      });
  }

  onDeleteCourse() {
    // console.log(this.course);
    this.coursesService.deleteCourse(this.courseId).subscribe({
      next: () => {
        this.router.navigate(['../../courses'], { relativeTo: this.route });
      },
      error: (errMess) => {
        console.log(errMess);
        this.message = errMess.error;
      },
    });
  }

  onDeleteStudent(student: DTO.StudentInCourse) {
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
          this.message = err.error.message;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
