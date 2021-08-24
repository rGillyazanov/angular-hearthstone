import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckRoutingModule } from './deck-routing.module';
import { BuilderComponent } from './builder/builder.component';
import { ShowHeroesComponent } from './builder/show-heroes/show-heroes.component';
import { CardsOfDeckComponent } from './cards-of-deck/cards-of-deck.component';
import { ListOfCardsInDeckComponent } from './list-of-cards-in-deck/list-of-cards-in-deck.component';
import { NgxsModule } from "@ngxs/store";
import { DeckState } from "./store/deck/deck.state";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    BuilderComponent,
    ShowHeroesComponent,
    CardsOfDeckComponent,
    ListOfCardsInDeckComponent
  ],
    imports: [
        CommonModule,
        DeckRoutingModule,
        NgxsModule.forFeature([
            DeckState
        ]),
        NgxPaginationModule
    ]
})
export class DeckModule { }
