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

@NgModule({
  declarations: [
    ManageAccountComponent,
    PageNotFoundComponent,
    ModalComponent,
    OptionsComponent,
    OptionLinkComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalComponent,
    OptionsComponent,
  ],
})
export class SharedModule {}
