import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import * as DTO from '../models/DTO.model';

// export interface Student {
//   _id: string;
//   name: string;
//   lastName: string;
//   email: string;
//   address: string;
//   courses?: Course[];
//   dateOfBirth: Date;
// }

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  // displayedStudent = new BehaviorSubject<Student>(null);
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAllStudents() {
    const url = `${environment.ServerHost}/professor/students`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.get<Student[]>(url, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.get(url);
  }

  getStudentById(id: string) {
    const url = `${environment.ServerHost}/professor/students/${id}`;
    return this.http.get(url);
  }

  deleteStudent(id: string) {
    const url = `${environment.ServerHost}/professor/students/${id}`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.delete(url, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.delete(url);
  }

  newStudent(student) {
    const url = `${environment.ServerHost}/student/signup`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.post(url, student, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.post(url, student);
  }
}
