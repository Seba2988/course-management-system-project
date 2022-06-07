import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import { Course } from './courses.service';

export interface Student {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  address: string;
  courses?: Course[];
  dateOfBirth: Date;
}

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  // displayedStudent = new BehaviorSubject<Student>(null);
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAllStudents() {
    const url = 'http://localhost:3000/students/all';
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.get<Student[]>(url, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.get<Student[]>(url);
  }

  getStudentById(id: string) {
    const url = `${environment.ServerHost}/students/get-student/${id}`;
    return this.http.get(url);
  }

  deleteStudent(id: string) {
    const url = `http://localhost:3000/students/delete/${id}`;
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
    const url = 'http://localhost:3000/students/new';
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
