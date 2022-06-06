import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { UpdatedFields } from '../components/manage-account/manage-account.component';

interface UpdateResData {
  name: string;
  lastName: string;
  email: string;
  address?: string;
  courses?: [];
  dateOfBirth?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ManageAccountService {
  constructor(private http: HttpClient) {}

  updateAccount(isStudent: boolean, updatedFields: UpdatedFields) {
    const url = `http://localhost:3000/${
      isStudent ? 'students' : 'professors'
    }/me`;
    const userData = isStudent
      ? JSON.parse(sessionStorage.getItem('studentToken'))
      : JSON.parse(sessionStorage.getItem('professorToken'));
    if (!userData) throw new Error('User not logged');
    const token = userData.token;
    return this.http
      .patch<UpdateResData>(url, updatedFields, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    // console.log(errorRes);
    let errorMessage = 'Error!';
    return throwError(() => {
      errorMessage;
    });
  }
}
