import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as DTO from '../../models/DTO.model';
import { AttendanceService } from '../../services/attendance.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  absences: DTO.Absence[];
  absSub: Subscription;
  courseId: string;
  studentId: string;
  message: string = null;
  redirectUrl: string = null;
  isStudent: boolean;
  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      // console.log(url);
      this.isStudent =
        this.router.url.slice(1, this.router.url.indexOf('/', 1)) ===
        'students';
      // console.log(this.isStudent);
      if (!this.isStudent) {
        this.courseId = url[3].path;
        this.studentId = url[1].path;
      } else {
        this.courseId = url[1].path;
        this.studentId = JSON.parse(
          sessionStorage.getItem('studentToken')
        ).userId;
      }
    });
    this.absSub = this.attendanceService
      .getAbsencesForStudentForCouse(this.studentId, this.courseId)
      .subscribe({
        next: (response: any) => {
          // console.log(response);
          this.absences = response.result;
          // console.log(this.absences);
        },
        error: (err) => {
          console.log(err);
          this.message = err.error.message;
          this.redirectUrl = this.isStudent
            ? 'students/courses'
            : `professors/student/${this.studentId}`;
        },
      });
  }
}
