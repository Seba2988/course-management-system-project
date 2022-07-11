import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import { Course } from '../models/Course.model';
import { StudentsService } from './students.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any> {
    const url = `${environment.ServerHost}/courses`;
    return this.http.get(url);
  }

  newCourse(course: Course): Observable<any> {
    const url = `${environment.ServerHost}/courses`;
    return this.http.post(url, course);
  }

  getCourseById(id: string): Observable<any> {
    const url = `${environment.ServerHost}/courses/${id}`;
    return this.http.get(url);
  }

  deleteCourse(id: string): Observable<any> {
    const url = `${environment.ServerHost}/courses/${id}`;
    return this.http.delete(url);
  }

  addStudentToCourse(courseId: string, studentId: string): Observable<any> {
    const url = `${environment.ServerHost}/courses/${courseId}/students`;
    return this.http.post(url, { userId: studentId });
  }

  deleteStudentFromCourse(
    courseId: string,
    studentId: string
  ): Observable<any> {
    const url = `${environment.ServerHost}/courses/${courseId}/students/${studentId}`;
    return this.http.patch(url, null);
  }

  getAllStudentsAvailableToAdd(courseId: string): Observable<any> {
    const url = `${environment.ServerHost}/student/notInCourse=${courseId}`;
    return this.http.get(url);
  }

  getAllCoursesForStudent(studentId: string): Observable<any> {
    const url = `${environment.ServerHost}/student/${studentId}/courses`;
    return this.http.get(url);
  }
}
