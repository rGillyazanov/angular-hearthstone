import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appConfig } from "../../config/app.config";
import { BuilderComponent } from "./builder/builder.component";

const routes: Routes = [
  {
    path: appConfig.routing.deckBuilder,
    component: BuilderComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckRoutingModule { }
