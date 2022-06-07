import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Student,
  StudentsService,
} from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit, OnDestroy {
  student: Student;
  studentId: string;
  studentSub: Subscription;
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
        next: (student: Student) => {
          if (!student._id)
            return this.router.navigate(['../../'], { relativeTo: this.route });
          return (this.student = student);
        },
      });
  }

  onDelete() {
    this.studentsService.deleteStudent(this.student._id).subscribe({
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
