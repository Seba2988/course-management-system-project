import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManageAccountService } from '../../services/manage-account.service';

export interface UpdatedFields {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Password?: string;
  DateOfBirth?: Date;
  Address?: string;
}

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
})
export class ManageAccountComponent implements OnInit, OnDestroy {
  isStudent: boolean;
  updateForm: FormGroup;
  updateSub: Subscription;
  message: string = null;
  redirectUrl: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageAccountService: ManageAccountService
  ) {}

  ngOnInit(): void {
    this.isStudent = this.router.url === '/students/me';
    this.redirectUrl = this.router.url;

    this.updateForm = new FormGroup({
      FirstName: new FormControl(null, []),
      lastName: new FormControl(null, []),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
        ),
      ]),
      DoB: new FormControl(null),
      address: new FormControl(null),
    });
  }

  onSubmit() {
    const name = this.updateForm.value.FirstName;
    const lastName = this.updateForm.value.lastName;
    const email = this.updateForm.value.email;
    const password = this.updateForm.value.password;
    const DoB = this.updateForm.value.DoB;
    const address = this.updateForm.value.address;
    const updatedFields: UpdatedFields = {};
    if (name) updatedFields.FirstName = name;
    if (lastName) updatedFields.LastName = lastName;
    if (email) updatedFields.Email = email;
    if (password) updatedFields.Password = password;
    if (DoB) updatedFields.DateOfBirth = DoB;
    if (address) updatedFields.Address = address;
    this.updateForm.reset();
    if (Object.keys(updatedFields).length === 0) {
      this.message = 'Your account has not been changed';
      // this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.updateSub = this.manageAccountService
        .updateAccount(this.isStudent, updatedFields)
        .subscribe({
          next: (resData) => {
            console.log(resData);
            this.message = 'Your account has been updated';
          },
          error: (errMessage) => {
            console.log(errMessage);
            this.message = errMessage.error.message;
            // console.log(errMessage);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.updateSub) this.updateSub.unsubscribe();
  }
}
