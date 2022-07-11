import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit, OnDestroy {
  student: User;
  studentId: string;
  studentSub: Subscription;
  redirectUrl: string = '/professors/students';
  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.studentId = url[1].path;
    });
    this.studentSub = this.studentsService
      .getStudentById(this.studentId)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (!response.result.id) this.router.navigate([this.redirectUrl]);
          else this.student = response.result;
          console.log(this.student);
        },
        error: (err: any) => {
          this.modalService.openModal(this.redirectUrl, err.error.message);
        },
      });
  }

  onDelete() {
    this.studentsService.deleteStudent(this.student.id).subscribe({
      next: () => {
        this.router.navigate([this.redirectUrl]);
      },
    });
  }

  onDeleteFromCourse() {}
  ngOnDestroy(): void {
    if (this.studentSub) this.studentSub.unsubscribe();
  }
}
