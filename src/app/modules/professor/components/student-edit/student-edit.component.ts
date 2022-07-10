import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students.service';
import * as DTO from '../../../../shared/models/DTO.model';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit, OnDestroy {
  student: DTO.User;
  studentId: string;
  studentSub: Subscription;
  message: string = null;
  redirectUrl: string = null;
  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.studentId = url[1].path;
    });
    this.studentSub = this.studentsService
      .getStudentById(this.studentId)
      .subscribe({
        next: (response: any) => {
          if (!response.result.id)
            return this.router.navigate(['../../'], { relativeTo: this.route });
          return (this.student = response.result);
        },
        error: (err: any) => {
          this.message = err.error.message;
          this.redirectUrl = 'professors/students';
        },
      });
  }

  onDelete() {
    this.studentsService.deleteStudent(this.student.id).subscribe({
      next: () => {
        this.router.navigate(['../../students'], { relativeTo: this.route });
        // this.studentsService.displayedStudent.next(null);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.studentSub) this.studentSub.unsubscribe();
  }
}
