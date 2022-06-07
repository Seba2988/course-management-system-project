import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import { Student, StudentsService } from './students.service';

export interface Course {
  courseId?: { _id: string; name?: string };
  _id: string;
  name: string;
  startingDate: Date;
  endingDate: Date;
  day: string;
  hour: string;
  students?: {
    studentId: Student;
    attendance: { date: Date; attended: boolean }[];
  }[];
}

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
    const url = `${environment.ServerHost}/courses/all`;
    return this.http.get<Course[]>(url);
  }

  newCourse(course) {
    const url = `${environment.ServerHost}/courses/new`;
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
    const url = `${environment.ServerHost}/courses/get-course/${id}`;
    return this.http.get(url);
  }

  deleteCourse(id: string) {
    const url = `${environment.ServerHost}/courses/delete/${id}`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.delete(url, {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.delete(url);
  }

  addStudentToCourse(courseId: string, studentId: string) {
    const url = `${environment.ServerHost}/courses/${courseId}/add-student/${studentId}`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.patch(url, null, {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.patch(url, null);
  }

  deleteStudentFromCourse(courseId: string, studentId: string) {
    const url = `${environment.ServerHost}/courses/${courseId}/delete-student/${studentId}`;
    // const professorToken = this.loginService.getProfessorToken();
    // return this.http.patch(url, null, {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${professorToken}`,
    //   }),
    // });
    return this.http.patch(url, null);
  }

  getAllStudentsAvailableToAdd(courseId: string) {
    const url = `${environment.ServerHost}/courses/${courseId}/all-available-students`;
    // const professorToken = this.loginService.getProfessorToken();
    return this.http.get(url);
  }

  getAllCoursesForStudent() {
    const studentData = JSON.parse(sessionStorage.getItem('studentToken'));
    if (!studentData) return undefined;
    const studentId = studentData.userId;
    const url = `${environment.ServerHost}/students/${studentId}/all-courses`;
    return this.http.get(url);
  }
}
