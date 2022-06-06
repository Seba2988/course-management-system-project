import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModalComponent } from './components/modal/modal.component';
import { OptionsComponent } from './components/options/options.component';
import { OptionLinkComponent } from './components/options/option-link/option-link.component';

@NgModule({
  declarations: [
    ManageAccountComponent,
    PageNotFoundComponent,
    ModalComponent,
    OptionsComponent,
    OptionLinkComponent,
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
