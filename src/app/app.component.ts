import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './modules/login/services/login.service';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isModalOpen: boolean;
  isModalOpenSub: Subscription;
  constructor(
    private loginService: LoginService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.loginService.autoLogin();
    this.isModalOpenSub = this.modalService.isOpen.subscribe(
      (isOpen: boolean) => {
        this.isModalOpen = isOpen;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.isModalOpenSub) this.isModalOpenSub.unsubscribe();
  }
}
