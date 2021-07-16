import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Store } from "@ngxs/store";
import { Register } from "../store/auth/auth.actions";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private store: Store) {
    this.registerForm = this.registerFormInit();
  }

  ngOnInit(): void {
  }

  registerFormInit() {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.max(255)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.max(255),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(8)
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.min(8)
      ])
    }, this.confirmedValidator('password', 'password_confirmation'));
  }

  private confirmedValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  registration() {
    if (this.registerForm.valid) {
      this.store.dispatch(new Register(this.registerForm.value)).subscribe(response => {
        console.log(response.message);
      }, error => {
        console.log(error.error.errors);
      });
    }
  }

}
