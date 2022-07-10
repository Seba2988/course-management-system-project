import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import { StudentsService } from './students.service';
import * as DTO from '../models/DTO.model';

// export interface Course {
//   courseId?: { _id: string; name?: string };
//   _id: string;
//   name: string;
//   startingDate: Date;
//   endingDate: Date;
//   //day: string;
//   //hour: string;
//   students?: {
//     studentId: Student;
//     attendance: { date: Date; attended: boolean }[];
//   }[];
// }

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // private _courses = new Subject<Course[]>();
  // courses = this._courses.asObservable();

  // private _studentsAvailable = new Subject<Student[]>();
  // studentsAvailable = this._studentsAvailable.asObservable();

  // displayedCourse = new BehaviorSubject<Course>(null);
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private studentsService: StudentsService
  ) {}

  getAllCourses() {
    const url = `${environment.ServerHost}/courses`;
    return this.http.get(url);
  }

  newCourse(course) {
    const url = `${environment.ServerHost}/courses`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.post(url, course, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.post(url, course);
  }

  getCourseById(id: string) {
    const url = `${environment.ServerHost}/courses/${id}`;
    return this.http.get(url);
  }

  deleteCourse(id: string) {
    const url = `${environment.ServerHost}/courses/${id}`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.delete(url, {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.delete(url);
  }

  addStudentToCourse(courseId: string, studentId: string) {
    const url = `${environment.ServerHost}/courses/${courseId}/students`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.patch(url, null, {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.post(url, { userId: studentId });
  }

  deleteStudentFromCourse(courseId: string, studentId: string) {
    const url = `${environment.ServerHost}/courses/${courseId}/students/${studentId}`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.patch(url, null, {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.patch(url, null);
  }

  getAllStudentsAvailableToAdd(courseId: string) {
    const url = `${environment.ServerHost}/student/notInCourse=${courseId}`;
    // const professorToken = this.loginService.getProfessorToken();
    return this.http.get(url);
  }

  getAllCoursesForStudent(studentId: string) {
    const url = `${environment.ServerHost}/student/${studentId}/courses`;
    return this.http.get(url);
  }
}
