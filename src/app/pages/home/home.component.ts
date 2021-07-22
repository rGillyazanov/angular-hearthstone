import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { CardsState } from "../../store/cards/cards.state";
import { HeroesState } from "../../store/heroes/heroes.state";
import { RaceState } from "../../store/race/race.state";
import { RarityState } from "../../store/rarity/rarity.state";

import { Hero, Mechanic, Race, Rarity, Type } from "../../shared/models/filters-types";
import { IAllCards } from "../../store/cards/cards-state.model";

import { TypeState } from "../../store/type/type.state";
import { MechanicState } from "../../store/mechanic/mechanic.state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @Select(CardsState.data) allCards$: Observable<IAllCards[]>;
  @Select(CardsState.currentPage) currentPage$: Observable<number>;
  @Select(CardsState.total) total$: Observable<number>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
