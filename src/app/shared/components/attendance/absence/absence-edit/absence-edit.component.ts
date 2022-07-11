import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditAbsence } from 'src/app/shared/models/EditAbsence.model';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

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
  redirectUrl: string;
  editSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private attendanceService: AttendanceService,
    private modalService: ModalService,
    private validatorsService: ValidatorsService
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
      this.validatorsService.reasonOfAbsenceValidator
    );
    this.redirectUrl = `students/course/${this.courseId}`;
  }

  onSubmit() {
    const editAbsence: EditAbsence = {
      isPresent: this.editForm.value.isPresent,
      reasonOfAbsence: this.editForm.value.reasonOfAbsence,
    };
    this.editSub = this.attendanceService
      .editAttendance(this.absenceId, this.studentId, editAbsence)
      .subscribe({
        next: () => {
          this.modalService.openModal(
            this.redirectUrl,
            'The absence has been updated'
          );
        },
        error: (err) => {
          this.modalService.openModal(this.redirectUrl, err.error.message);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.editSub) this.editSub.unsubscribe();
  }
}
