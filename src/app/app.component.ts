import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Actions, ofActionDispatched } from "@ngxs/store";
import { Logout } from "./auth/store/auth/auth.actions";
import { Router } from "@angular/router";
import { appConfig } from "../config/app.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient,
              private actions: Actions,
              private router: Router) {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate([appConfig.routing.login]);
    });
  }

  ngOnInit() {
  }
}
