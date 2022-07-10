import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, StudentRoutingModule],
})
export class StudentModule {}
