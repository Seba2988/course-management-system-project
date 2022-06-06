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
  students: Student[];
  studentsToDisplay: Student[];
  course: Course;
  courseSub: Subscription;
  message: string = null;
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseSub = this.coursesService.displayedCourse.subscribe((course) => {
      this.course = course;
    });
    // this.studentsService.getAllStudents();
    this.coursesService.getAllStudentsAvailableToAdd(this.course._id);
    this.studentsSub = this.coursesService.studentsAvailable.subscribe(
      (students) => {
        this.students = students;
        this.studentsToDisplay = [...this.students];
        // console.log(this.studentsToDisplay.length);
        // if (this.students.length === 0) {
        //   this.message = 'There are not students to add to this course';
        // }
      }
    );
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
    console.log(this.course._id, id);
    this.coursesService.addStudentToCourse(this.course._id, id).subscribe({
      next: () => {
        this.message = 'The student has been added';
      },
      error: (err) => {
        this.message = err;
      },
    });
    // this.coursesService.addStudentToCourse(this.course._id, id).subscribe({
    //   next: () => {
    //     this.message = 'The student has been added';
    //   },
    //   error: (err) => {
    //     this.message = err;
    //   },
    // });
  }

  ngOnDestroy(): void {
    if (this.studentsSub) this.studentsSub.unsubscribe();
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
