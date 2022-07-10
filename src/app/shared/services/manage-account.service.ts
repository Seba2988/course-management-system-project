import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdatedFields } from '../components/manage-account/manage-account.component';

// interface UpdateResData {
//   name: string;
//   lastName: string;
//   email: string;
//   address?: string;
//   courses?: [];
//   dateOfBirth?: Date;
// }
interface UpdateResData {
  succeeded: string;
  errors: [];
}

@Injectable({
  providedIn: 'root',
})
export class ManageAccountService {
  constructor(private http: HttpClient) {}

  updateAccount(isStudent: boolean, updatedFields: UpdatedFields) {
    const url = `${environment.ServerHost}/${
      isStudent ? 'student' : 'professor'
    }/me`;
    const userData = isStudent
      ? JSON.parse(sessionStorage.getItem('studentToken'))
      : JSON.parse(sessionStorage.getItem('professorToken'));
    if (!userData) throw new Error('User not logged');
    return this.http.patch<UpdateResData>(url, updatedFields);
    // .pipe(catchError(this.handleError));
  }

  // private handleError(errorRes: HttpErrorResponse) {
  //   // console.log(errorRes);
  //   //let errorMessage = 'Error!';
  //   console.log(errorRes);
  //   return throwError(() => {
  //     errorRes.error;
  //   });
  // }
}
