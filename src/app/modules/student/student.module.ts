import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { AttendanceComponent } from './components/attendance/attendance.component';

@NgModule({
  declarations: [StudentDashboardComponent, AttendanceComponent],
  imports: [SharedModule, StudentRoutingModule],
})
export class StudentModule {}
