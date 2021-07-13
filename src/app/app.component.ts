import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  loginForm: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password_confirmation: new FormControl('')
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  registration() {
    if (this.form.valid) {
      this.http.post('/api/auth/registration', this.form.value).subscribe(response => {
        console.log(response);
      })
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.http.post('/api/auth/login', this.loginForm.value).subscribe(response => {
        console.log(response);
      })
    }
  }
}
