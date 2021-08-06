import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { appConfig } from "../config/app.config";

export const appRoutes: Routes = [
  {
    path: appConfig.routing.home, component: HomeComponent, pathMatch: 'full',
    loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: appConfig.routing.deck,
    loadChildren: () => import('./deck/deck.module').then(m => m.DeckModule)
  },
  { path: '**', component: NotFoundComponent },
];
