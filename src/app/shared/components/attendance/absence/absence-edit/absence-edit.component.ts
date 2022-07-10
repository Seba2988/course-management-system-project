import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import * as DTO from '../../../../models/DTO.model';

@Component({
  selector: 'app-absence-edit',
  templateUrl: './absence-edit.component.html',
  styleUrls: ['./absence-edit.component.scss'],
})
export class AbsenceEditComponent implements OnInit, OnDestroy {
  absenceId: string = null;
  studentId: string = null;
  courseId: string = null;
  editForm: FormGroup;
  message: string = null;
  redirectUrl: string = null;
  editSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.absenceId = url[3].path;
      this.courseId = url[1].path;
    });
    this.studentId = JSON.parse(sessionStorage.getItem('studentToken')).userId;

    this.editForm = new FormGroup(
      {
        isPresent: new FormControl(false, []),
        reasonOfAbsence: new FormControl(null, []),
      },
      this.reasonOfAbsenceValidator
    );
    this.redirectUrl = `students/course/${this.courseId}`;
  }

  onSubmit() {
    const editAbsence: DTO.EditAbsence = {
      isPresent: this.editForm.value.isPresent,
      reasonOfAbsence: this.editForm.value.reasonOfAbsence,
    };
    // console.log(editAbsence);
    this.editSub = this.attendanceService
      .editAttendance(this.absenceId, this.studentId, editAbsence)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.message = 'The absence has been updated';
        },
        error: (err) => {
          console.log(err);
          this.message = err.error.message;
        },
      });
  }

  reasonOfAbsenceValidator(fg: FormGroup): ValidationErrors | null {
    const isPresent = fg.get('isPresent').value;
    const reasonOfAbsence = fg.get('reasonOfAbsence').value;
    if (
      !isPresent &&
      (reasonOfAbsence == null || reasonOfAbsence.trim().length === 0)
    )
      return { explanationError: fg.value };
    return null;
  }

  ngOnDestroy(): void {
    if (this.editSub) this.editSub.unsubscribe();
  }
}
