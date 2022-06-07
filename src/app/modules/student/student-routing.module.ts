import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAccountComponent } from 'src/app/shared/components/manage-account/manage-account.component';
import { OptionsComponent } from 'src/app/shared/components/options/options.component';
import { LoginGuard } from '../login/login.guard';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentGuard } from './services/student.guard';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    canActivate: [StudentGuard],
    children: [
      { path: 'me', component: ManageAccountComponent },
      { path: 'courses', component: OptionsComponent },
      { path: 'course/:id', component: AttendanceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
