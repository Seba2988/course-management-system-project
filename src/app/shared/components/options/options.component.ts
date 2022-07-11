import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../models/Course.model';
import { User } from '../../models/User.model';
import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit, OnDestroy {
  pathSub: Subscription;
  path: string;
  buttonText: string;
  isData: boolean = false;
  isStudent: boolean;
  dataSub: Subscription;
  studentId: string = null;
  data;
  dataToDisplay;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.pathSub = this.route.url.subscribe((url) => {
      this.path = url[0].path;
    });
    this.isStudent = sessionStorage.getItem('studentToken') ? true : false;
    if (this.isStudent) {
      this.studentId = JSON.parse(
        sessionStorage.getItem('studentToken')
      ).userId;
      this.dataSub = this.coursesService
        .getAllCoursesForStudent(this.studentId)
        .subscribe({
          next: (response: any) => {
            this.retrieveData(response.result);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.buttonText = this.path.slice(0, this.path.length - 1);
      if (this.path === 'students') {
        this.dataSub = this.studentsService.getAllStudents().subscribe({
          next: (response: any) => {
            console.log(response);
            this.retrieveData(response.result);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
      if (this.path === 'courses') {
        this.dataSub = this.coursesService.getAllCourses().subscribe({
          next: (response: any) => {
            console.log(response);
            this.retrieveData(response.result);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }

  retrieveData(data) {
    this.data = data;
    this.isData = this.data.length !== 0;
    if (this.isData) this.dataToDisplay = [...this.data];
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onSearch(event) {
    if (!this.isData) return;
    const search: string = event.target.value;
    if (this.path === 'students') {
      this.dataToDisplay = this.data.filter(
        (student: User) =>
          student.firstName.toLowerCase().includes(search.toLowerCase()) ||
          student.lastName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (this.path === 'courses') {
      this.dataToDisplay = this.data.filter((course: Course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  ngOnDestroy(): void {
    if (this.pathSub) this.pathSub.unsubscribe();
    if (this.dataSub) this.dataSub.unsubscribe();
  }
}
