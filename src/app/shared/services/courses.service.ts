import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { Student, StudentsService } from './students.service';

export interface Course {
  courseId?: { _id: string };
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
  private _courses = new Subject<Course[]>();
  courses = this._courses.asObservable();

  private _studentsAvailable = new Subject<Student[]>();
  studentsAvailable = this._studentsAvailable.asObservable();

  displayedCourse = new BehaviorSubject<Course>(null);
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private studentsService: StudentsService
  ) {}

  getAllCourses() {
    const url = 'http://localhost:3000/courses/all';
    this.http.get<Course[]>(url).subscribe((data) => {
      this._courses.next(data);
    });
  }

  newCourse(course) {
    const url = 'http://localhost:3000/courses/new';
    const professorToken = this.loginService.getProfessorToken();
    return this.http.post(url, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${professorToken}`,
      }),
    });
  }

  deleteCourse(id: string) {
    const url = `http://localhost:3000/courses/delete/${id}`;
    const professorToken = this.loginService.getProfessorToken();
    return this.http.delete(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${professorToken}`,
      }),
    });
  }

  addStudentToCourse(courseId: string, studentId: string) {
    const url = `http://localhost:3000/courses/${courseId}/add-student/${studentId}`;
    const professorToken = this.loginService.getProfessorToken();
    return this.http.patch(url, null, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${professorToken}`,
      }),
    });
  }

  getAllStudentsAvailableToAdd(courseId: string) {
    this.studentsService.getAllStudents();
    this.studentsService.students.subscribe({
      next: (students: Student[]) => {
        console.log(students);
        let studentsToDisplay = [];
        for (let i = 0; i < students.length; i++) {
          for (let j = 0; j < students[i].courses.length; j++) {
            if (students[i].courses[j].courseId._id !== courseId) {
              studentsToDisplay.push(students[i]);
            }
          }
          console.log(studentsToDisplay);
        }

        this._studentsAvailable.next(studentsToDisplay);
      },
    });
  }
}
