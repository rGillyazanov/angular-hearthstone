import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth/auth.service";
import { Store } from "@ngxs/store";
import { Login } from "../store/auth/auth.actions";
import { Router } from "@angular/router";
import { appConfig } from "../../../config/app.config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorLogin: {
    error: boolean,
    message: string
  }

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store) {
    this.loginForm = this.loginFormInit();

    this.errorLogin = {
      error: false,
      message: 'Ошибка авторизации. Неверный логин или пароль.'
    };
  }

  ngOnInit(): void {
  }

  loginFormInit() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new Login(this.loginForm.value)).subscribe(response => {
        this.errorLogin.error = false;
        this.router.navigate([appConfig.routing.home]);
      }, error => {
        if (error.status === 401) {
          this.errorLogin.error = true;
        }
      });
    }
  }

}
