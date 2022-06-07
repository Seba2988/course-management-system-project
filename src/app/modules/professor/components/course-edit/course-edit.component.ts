import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Course,
  CoursesService,
} from 'src/app/shared/services/courses.service';
import { Student } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  course: Course;
  courseSub: Subscription;
  courseId: string;
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
        next: (course: Course) => {
          if (!course._id)
            return this.router.navigate(['../../'], { relativeTo: this.route });
          return (this.course = course);
        },
        error: (err) => {
          // console.log(err);
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
      });
  }

  onDeleteCourse() {
    this.coursesService.deleteCourse(this.courseId).subscribe({
      next: () => {
        this.router.navigate(['../../courses'], { relativeTo: this.route });
        // this.coursesService.displayedCourse.next(null);
      },
    });
  }

  onDeleteStudent(student) {
    // console.log(student.studentId._id);
    const studentId = student.studentId._id;
    this.coursesService
      .deleteStudentFromCourse(this.courseId, studentId)
      .subscribe({
        next: (course: Course) => {
          this.course = course;
          console.log(this.course);
          location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
