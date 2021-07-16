import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from "@ngxs/store";
import { appConfig } from "../../config/app.config";
import { AuthState } from "./store/auth/auth.state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store,
              private router: Router) {
  }

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);

    if (!isAuthenticated) {
      this.router.navigate([appConfig.routing.login])
    }

    return true;
  }

}
