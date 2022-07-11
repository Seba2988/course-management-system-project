import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditUser } from '../../models/EditUser.model';
import { ManageAccountService } from '../../services/manage-account.service';
import { ModalService } from '../../services/modal.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
})
export class ManageAccountComponent implements OnInit, OnDestroy {
  isStudent: boolean;
  updateForm: FormGroup;
  updateSub: Subscription;
  redirectUrl: string;

  constructor(
    private router: Router,
    private manageAccountService: ManageAccountService,
    private modalService: ModalService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.isStudent = this.router.url === '/students/me';
    this.redirectUrl = this.router.url;

    this.updateForm = new FormGroup(
      {
        firstName: new FormControl(null),
        lastName: new FormControl(null),
        email: new FormControl(null, [Validators.email]),
        password: new FormControl(null, [
          Validators.pattern(this.validatorsService.passwordRegex),
        ]),
        DoB: new FormControl(null, [this.validatorsService.DoBValidator]),
        address: new FormControl(null),
      },
      this.validatorsService.atLeastOneFieldNotNullValidator
    );
  }

  onSubmit() {
    const updateFormValue = this.updateForm.value;
    const updatedFields: EditUser = {
      FirstName: updateFormValue.FirstName,
      LastName: updateFormValue.lastName,
      Email: updateFormValue.email,
      Password: updateFormValue.password,
      DateOfBirth: updateFormValue.DoB,
      Address: updateFormValue.address,
    };
    this.updateForm.reset();
    this.updateSub = this.manageAccountService
      .updateAccount(this.isStudent, updatedFields)
      .subscribe({
        next: (resData) => {
          console.log(resData);
          this.modalService.openModal(
            this.redirectUrl,
            'Your account has been updated'
          );
        },
        error: (errMessage) => {
          console.log(errMessage);
          this.modalService.openModal(
            this.redirectUrl,
            errMessage.error.message
          );
        },
      });
  }

  ngOnDestroy(): void {
    if (this.updateSub) this.updateSub.unsubscribe();
  }
}
