import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceEditComponent } from 'src/app/shared/components/attendance/absence/absence-edit/absence-edit.component';
import { AttendanceComponent } from 'src/app/shared/components/attendance/attendance.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { ManageAccountComponent } from 'src/app/shared/components/manage-account/manage-account.component';
import { OptionsComponent } from 'src/app/shared/components/options/options.component';
import { StudentGuard } from './services/student.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [StudentGuard],
    children: [
      { path: 'me', component: ManageAccountComponent },
      { path: 'courses', component: OptionsComponent },
      { path: 'course/:id', component: AttendanceComponent },
      {
        path: 'course/:courseId/absence/:absenceId',
        component: AbsenceEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
