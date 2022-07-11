import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Absence } from '../../models/Absence.model';
import { AttendanceService } from '../../services/attendance.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  absences: Absence[];
  absSub: Subscription;
  courseId: string;
  studentId: string;
  redirectUrl: string;
  isStudent: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private attendanceService: AttendanceService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.isStudent =
        this.router.url.slice(1, this.router.url.indexOf('/', 1)) ===
        'students';

      if (!this.isStudent) {
        this.courseId = url[3].path;
        this.studentId = url[1].path;
      } else {
        this.courseId = url[1].path;
        this.studentId = JSON.parse(
          sessionStorage.getItem('studentToken')
        ).userId;
      }
      this.redirectUrl = this.isStudent
        ? 'students/courses'
        : `professors/student/${this.studentId}`;
    });
    this.absSub = this.attendanceService
      .getAbsencesForStudentForCouse(this.studentId, this.courseId)
      .subscribe({
        next: (response: any) => {
          this.absences = response.result;
        },
        error: (err) => {
          console.log(err);
          this.modalService.openModal(this.redirectUrl, err.error.message);
        },
      });
  }
}
