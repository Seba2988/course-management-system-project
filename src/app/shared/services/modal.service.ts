import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _defaultMessage: string = 'Something went wrong!';
  isOpen = new BehaviorSubject<boolean>(false);
  message = new BehaviorSubject<string>(this._defaultMessage);
  redirectUrl = new BehaviorSubject<string>(null);
  constructor(private router: Router) {}

  openModal(redirectUrl: string, message?: string): void {
    this.isOpen.next(true);
    if (message) this.message.next(message);
    this.redirectUrl.next(redirectUrl);
  }

  closeModal(): void {
    this.router.navigate([this.redirectUrl.value]);
    this.resetValues();
    this.isOpen.next(false);
  }

  resetValues(): void {
    this.message.next(this._defaultMessage);
    this.redirectUrl.next(null);
  }
}
