import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routerPaths = {
  home: '',
  login: '/login',
  registration: '/register'
}

export const appRoutes: Routes = [
  { path: routerPaths.home, component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];
