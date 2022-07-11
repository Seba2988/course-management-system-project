import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditAbsence } from '../models/EditAbsence.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  getAbsencesForStudentForCouse(
    studentId: string,
    courseId: string
  ): Observable<any> {
    const url = `${environment.ServerHost}/student/${studentId}/absences/${courseId}`;
    return this.http.get(url);
  }

  editAttendance(
    absenceId: string,
    studentId: string,
    editAbsence: EditAbsence
  ): Observable<any> {
    const url = `${environment.ServerHost}/student/${studentId}/absences/${absenceId}`;
    return this.http.patch(url, editAbsence);
  }
}
