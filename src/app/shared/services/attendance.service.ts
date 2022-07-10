import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as DTO from '../models/DTO.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  getAbsencesForStudentForCouse(studentId: string, courseId: string) {
    const url = `${environment.ServerHost}/student/${studentId}/absences/${courseId}`;
    return this.http.get(url);
  }

  editAttendance(
    absenceId: string,
    studentId: string,
    editAbsence: DTO.EditAbsence
  ) {
    const url = `${environment.ServerHost}/student/${studentId}/absences/${absenceId}`;
    return this.http.patch(url, editAbsence);
  }
}
