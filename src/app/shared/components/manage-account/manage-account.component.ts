import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManageAccountService } from '../../services/manage-account.service';

export interface UpdatedFields {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: Date;
  address?: string;
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageAccountService: ManageAccountService
  ) {}

  ngOnInit(): void {
    this.isStudent = this.router.url === '/student/me';

    this.updateForm = new FormGroup({
      name: new FormControl(null, []),
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
    const name = this.updateForm.value.name;
    const lastName = this.updateForm.value.lastName;
    const email = this.updateForm.value.email;
    const password = this.updateForm.value.password;
    const DoB = this.updateForm.value.DoB;
    const address = this.updateForm.value.address;
    const updatedFields: UpdatedFields = {};
    if (name) updatedFields.name = name;
    if (lastName) updatedFields.lastName = lastName;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;
    if (DoB) updatedFields.dateOfBirth = DoB;
    if (address) updatedFields.address = address;
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
            this.message = errMessage;
            // console.log(errMessage);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.updateSub) this.updateSub.unsubscribe();
  }
}
