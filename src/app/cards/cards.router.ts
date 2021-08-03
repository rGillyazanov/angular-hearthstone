import { Routes } from "@angular/router";
import { appConfig } from "../../config/app.config";
import { CardComponent } from "./components/card/card.component";

export const cardsRoutes: Routes = [
  { path: appConfig.routing.card + '/:id', component: CardComponent, pathMatch: 'full'}
];
