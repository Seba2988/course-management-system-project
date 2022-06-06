import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutingModule, SharedModule],
})
export class LoginModule {}
