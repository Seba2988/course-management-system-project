import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Course,
  CoursesService,
} from 'src/app/shared/services/courses.service';
import {
  Student,
  StudentsService,
} from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.scss'],
})
export class AddStudentToCourseComponent implements OnInit, OnDestroy {
  studentsSub: Subscription;
  students;
  studentsToDisplay;
  course: Course;
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
      console.log(this.courseId);
    });
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (course: Course) => {
        this.course = course;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.studentsSub = this.coursesService
      .getAllStudentsAvailableToAdd(this.courseId)
      .subscribe((students) => {
        this.students = students;
        if (this.students.length !== 0)
          this.studentsToDisplay = [...this.students];
        else this.message = 'There are not students available';
      });
  }

  onSearch(event) {
    const search: string = event.target.value.toLowerCase();
    this.studentsToDisplay = this.students.filter(
      (student: Student) =>
        student.name.toLowerCase().includes(search) ||
        student.lastName.toLowerCase().includes(search)
    );
  }

  onAdd(id) {
    this.coursesService.addStudentToCourse(this.courseId, id).subscribe({
      next: () => {
        this.message = 'The student has been added';
      },
      error: (err) => {
        this.message = err;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.studentsSub) this.studentsSub.unsubscribe();
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
