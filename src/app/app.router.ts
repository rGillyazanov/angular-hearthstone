import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { appConfig } from "../config/app.config";
import { CardsGuard } from "./shared/guards/cards.guard";

export const appRoutes: Routes = [
  { path: appConfig.routing.home, component: HomeComponent, pathMatch: 'full', canActivate: [CardsGuard] },
  { path: '**', component: NotFoundComponent },
];
