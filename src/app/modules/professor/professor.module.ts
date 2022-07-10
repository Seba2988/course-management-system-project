import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddStudentToCourseComponent } from './components/course-edit/add-student-to-course/add-student-to-course.component';

@NgModule({
  declarations: [
    StudentEditComponent,
    CourseEditComponent,
    AddStudentComponent,
    AddCourseComponent,
    AddStudentToCourseComponent,
  ],
  imports: [SharedModule, ProfessorRoutingModule],
})
export class ProfessorModule {}
