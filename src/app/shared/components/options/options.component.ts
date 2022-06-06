import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course, CoursesService } from '../../services/courses.service';
import { Student, StudentsService } from '../../services/students.service';

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
    this.buttonText = this.path.slice(0, this.path.length - 1);
    if (this.path === 'students') {
      this.studentsService.getAllStudents();
      this.studentsService.students.subscribe((data) => {
        this.data = data;
        this.isData = Object.keys(this.data).length !== 0;
        if (this.isData) this.dataToDisplay = [...this.data];
      });
    }
    if (this.path === 'courses') {
      this.coursesService.getAllCourses();
      this.coursesService.courses.subscribe((data) => {
        this.data = data;

        this.isData = Object.keys(this.data).length !== 0;
        if (this.isData) this.dataToDisplay = [...this.data];
        console.log(this.dataToDisplay);
      });
    }
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onSearch(event) {
    if (!this.isData) return;
    const search: string = event.target.value;
    if (this.path === 'students') {
      this.dataToDisplay = this.data.filter(
        (student: Student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
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
  }
}
