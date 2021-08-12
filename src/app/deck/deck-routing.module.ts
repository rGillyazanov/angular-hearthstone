import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuilderComponent } from "./builder/builder.component";
import { CardsOfDeckComponent } from "./cards-of-deck/cards-of-deck.component";

import { appConfig } from "../../config/app.config";

const routes: Routes = [
  {
    path: appConfig.routing.deckBuilder,
    component: BuilderComponent,
    pathMatch: 'full'
  },
  {
    path: 'hero/:id',
    component: CardsOfDeckComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckRoutingModule { }
