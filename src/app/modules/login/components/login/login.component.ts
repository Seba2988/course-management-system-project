import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isStudent = true;
  loginForm: FormGroup;
  error: string = null;
  loginSub: Subscription;
  isLoading = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/\$%\^&\*]).{8,}$/
        ),
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
          this.error = errMessage.error.message;
          this.loginForm.reset();
          // console.log(errMessage.error);
        },
      });
    // this.loginForm.reset();
    // if (this.isStudent) {
    //   this.router.navigate(['/student']);
    // } else this.router.navigate(['/professor']);
  }

  onSelect() {
    this.isStudent = !this.isStudent;
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
}
