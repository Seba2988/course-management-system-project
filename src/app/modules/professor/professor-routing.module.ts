import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAccountComponent } from 'src/app/shared/components/manage-account/manage-account.component';
import { OptionsComponent } from 'src/app/shared/components/options/options.component';
import { LoginGuard } from '../login/login.guard';

import { AddCourseComponent } from './components/add-course/add-course.component';

import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddStudentToCourseComponent } from './components/course-edit/add-student-to-course/add-student-to-course.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { ProfessorGuard } from './services/professor.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfessorDashboardComponent,
    canActivate: [ProfessorGuard],
    children: [
      { path: 'me', component: ManageAccountComponent },
      { path: 'students', component: OptionsComponent },
      { path: 'students/new', component: AddStudentComponent },
      { path: 'student/:id', component: StudentEditComponent },
      { path: 'courses', component: OptionsComponent },
      { path: 'courses/new', component: AddCourseComponent },
      { path: 'course/:id', component: CourseEditComponent },
      {
        path: 'course/:id/add-student',
        component: AddStudentToCourseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorRoutingModule {}
