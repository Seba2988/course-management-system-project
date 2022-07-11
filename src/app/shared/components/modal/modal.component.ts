import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  message: string;
  redirectUrl: string;
  messageSub: Subscription;
  redirectUrlSub: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.messageSub = this.modalService.message.subscribe((message) => {
      this.message = message;
    });
    this.redirectUrlSub = this.modalService.redirectUrl.subscribe((redUrl) => {
      this.redirectUrl = redUrl;
    });
  }

  onClose() {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    if (this.messageSub) this.messageSub.unsubscribe();
    if (this.redirectUrlSub) this.redirectUrlSub.unsubscribe();
  }
}
