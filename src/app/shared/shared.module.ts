import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModalComponent } from './components/modal/modal.component';
import { OptionsComponent } from './components/options/options.component';
import { OptionLinkComponent } from './components/options/option-link/option-link.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AbsenceComponent } from './components/attendance/absence/absence.component';
import { AbsenceEditComponent } from './components/attendance/absence/absence-edit/absence-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ManageAccountComponent,
    PageNotFoundComponent,
    ModalComponent,
    OptionsComponent,
    OptionLinkComponent,
    AttendanceComponent,
    AbsenceComponent,
    AbsenceEditComponent,
    DashboardComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalComponent,
    OptionsComponent,
    AttendanceComponent,
    DashboardComponent,
  ],
})
export class SharedModule {}
