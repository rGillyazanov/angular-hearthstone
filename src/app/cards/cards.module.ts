import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from "./components/cards/cards.component";
import { CardsFilterComponent } from "./components/cards-filter/cards-filter.component";
import { CardComponent } from './components/card/card.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from "@angular/router";

import { cardsRoutes } from "./cards.router";

@NgModule({
  declarations: [
    CardsComponent,
    CardsFilterComponent,
    CardComponent
  ],
  exports: [
    CardsFilterComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    NgxPaginationModule,
    RouterModule.forChild(cardsRoutes)
  ]
})
export class CardsModule {
}
