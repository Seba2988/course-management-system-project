import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import * as DTO from '../../../../../shared/models/DTO.model';

@Component({
  selector: 'app-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.scss'],
})
export class AddStudentToCourseComponent implements OnInit, OnDestroy {
  studentsSub: Subscription;
  students;
  studentsToDisplay;
  course: DTO.Course;
  courseSub: Subscription;
  message: string = null;
  courseId;
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.courseId = url[1].path;
    });
    this.studentsSub = this.coursesService
      .getAllStudentsAvailableToAdd(this.courseId)
      .subscribe({
        next: (response: any) => {
          this.students = response.result;
          if (this.students.length !== 0)
            this.studentsToDisplay = [...this.students];
          else this.message = 'There are not students available';
        },
        error: (errMess) => {
          this.message = errMess.error.message;
        },
      });
  }

  onSearch(event) {
    const search: string = event.target.value.toLowerCase();
    this.studentsToDisplay = this.students.filter(
      (student: DTO.User) =>
        student.firstName.toLowerCase().includes(search) ||
        student.lastName.toLowerCase().includes(search)
    );
  }

  onAdd(id: string) {
    this.coursesService.addStudentToCourse(this.courseId, id).subscribe({
      next: (response: any) => {
        this.message = response.result;
      },
      error: (err) => {
        console.log(err);
        this.message = err.error.message;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.studentsSub) this.studentsSub.unsubscribe();
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
