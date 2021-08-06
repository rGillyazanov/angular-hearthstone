import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckRoutingModule } from './deck-routing.module';
import { BuilderComponent } from './builder/builder.component';
import { ShowHeroesComponent } from './builder/show-heroes/show-heroes.component';

@NgModule({
  declarations: [
    BuilderComponent,
    ShowHeroesComponent
  ],
  imports: [
    CommonModule,
    DeckRoutingModule
  ]
})
export class DeckModule { }
