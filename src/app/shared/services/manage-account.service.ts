import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditUser } from '../models/EditUser.model';

@Injectable({
  providedIn: 'root',
})
export class ManageAccountService {
  constructor(private http: HttpClient) {}
  updateAccount(isStudent: boolean, updatedFields: EditUser): Observable<any> {
    const url = `${environment.ServerHost}/${
      isStudent ? 'student' : 'professor'
    }/me`;
    const userData = isStudent
      ? JSON.parse(sessionStorage.getItem('studentToken'))
      : JSON.parse(sessionStorage.getItem('professorToken'));
    if (!userData) throw new Error('User not logged');
    return this.http.patch(url, updatedFields);
  }
}
