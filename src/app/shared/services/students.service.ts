import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import { SignUpModel } from '../models/SignUp.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAllStudents(): Observable<any> {
    const url = `${environment.ServerHost}/professor/students`;
    return this.http.get(url);
  }

  getStudentById(id: string): Observable<any> {
    const url = `${environment.ServerHost}/professor/students/${id}`;
    return this.http.get(url);
  }

  deleteStudent(id: string): Observable<any> {
    const url = `${environment.ServerHost}/professor/students/${id}`;
    return this.http.delete(url);
  }

  newStudent(student: SignUpModel): Observable<any> {
    const url = `${environment.ServerHost}/student/signup`;
    return this.http.post(url, student);
  }
}
