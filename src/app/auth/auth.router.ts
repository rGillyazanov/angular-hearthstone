import { Routes } from "@angular/router";
import { appConfig } from "../../config/app.config";

import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";

export const authRoutes: Routes = [
  { path: appConfig.routing.login, component: LoginComponent },
  { path: appConfig.routing.registration, component: RegistrationComponent }
];
