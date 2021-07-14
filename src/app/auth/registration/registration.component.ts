import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
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
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password_confirmation: new FormControl('')
    });
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
