import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Course,
  CoursesService,
} from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  course: Course;
  courseSub: Subscription;
  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseSub = this.coursesService.displayedCourse.subscribe((course) => {
      console.log(course);
      this.course = course;
    });
  }

  onDelete() {
    this.coursesService.deleteCourse(this.course._id).subscribe({
      next: () => {
        this.router.navigate(['../../courses'], { relativeTo: this.route });
        this.coursesService.displayedCourse.next(null);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
