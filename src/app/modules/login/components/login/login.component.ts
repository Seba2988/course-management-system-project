import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isStudent = true;
  loginForm: FormGroup;
  loginSub: Subscription;
  isLoading = false;
  redirectUrl: string = 'login';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: ModalService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.validatorsService.passwordRegex),
      ]),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;
    this.loginSub = this.loginService
      .login(email, password, this.isStudent)
      .subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
          if (this.isStudent) {
            this.router.navigate(['/students']);
          } else this.router.navigate(['/professors']);
        },
        error: (errMessage) => {
          console.log(errMessage);
          this.loginForm.reset();
          this.modalService.openModal(
            this.redirectUrl,
            errMessage.error.message
          );
        },
      });
  }

  onSelect() {
    this.isStudent = !this.isStudent;
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
}
