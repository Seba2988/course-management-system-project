import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/models/Course.model';
import { User } from 'src/app/shared/models/User.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { ModalService } from 'src/app/shared/services/modal.service';

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
  redirectUrl: string;
  courseId;
  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.courseId = url[1].path;
      this.redirectUrl = `/professors/course/${this.courseId}`;
    });
    this.studentsSub = this.coursesService
      .getAllStudentsAvailableToAdd(this.courseId)
      .subscribe({
        next: (response: any) => {
          this.students = response.result;
          if (this.students.length !== 0)
            this.studentsToDisplay = [...this.students];
          else
            this.modalService.openModal(
              this.redirectUrl,
              'There are not students available'
            );
        },
        error: (errMess) => {
          this.modalService.openModal(this.redirectUrl, errMess.error.message);
        },
      });
  }

  onSearch(event) {
    const search: string = event.target.value.toLowerCase();
    this.studentsToDisplay = this.students.filter(
      (student: User) =>
        student.firstName.toLowerCase().includes(search) ||
        student.lastName.toLowerCase().includes(search)
    );
  }

  onAdd(id: string) {
    this.coursesService.addStudentToCourse(this.courseId, id).subscribe({
      next: (response: any) => {
        this.modalService.openModal(this.redirectUrl, response.result);
      },
      error: (err) => {
        console.log(err);
        this.modalService.openModal(this.redirectUrl, err.error.message);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.studentsSub) this.studentsSub.unsubscribe();
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
