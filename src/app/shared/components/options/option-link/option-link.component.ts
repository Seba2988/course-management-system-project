import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-option-link',
  templateUrl: './option-link.component.html',
  styleUrls: ['./option-link.component.scss'],
})
export class OptionLinkComponent implements OnInit, OnDestroy {
  @Input() index;
  pathSub: Subscription;
  path: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.pathSub = this.route.url.subscribe((url) => {
      this.path = url[0].path;
    });
  }

  onClick() {
    if (this.path === 'students') {
      // this.studentsService.displayedStudent.next(this.index);
      this.router.navigate(['../student', this.index._id], {
        relativeTo: this.route,
      });
    }
    if (this.path === 'courses') {
      // this.coursesService.displayedCourse.next(this.index);
      this.router.navigate(['../course', this.index._id], {
        relativeTo: this.route,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.pathSub) this.pathSub.unsubscribe();
  }
}
