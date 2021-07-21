import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

import { CardsState } from "../../store/cards/cards.state";
import { HeroesState } from "../../store/heroes/heroes.state";
import { RaceState } from "../../store/race/race.state";
import { RarityState } from "../../store/rarity/rarity.state";

import { Hero, Mechanic, Race, Rarity, Type } from "../../shared/models/filters-types";
import { IAllCards } from "../../store/cards/cards-state.model";

import { GetAllHeroes } from "../../store/heroes/heroes.actions";
import { GetAllRaces } from "../../store/race/race.actions";
import { GetAllRarities } from "../../store/rarity/rarity.actions";
import { GetAllTypes } from "../../store/type/type.actions";
import { TypeState } from "../../store/type/type.state";
import { MechanicState } from "../../store/mechanic/mechanic.state";
import { GetAllMechanics } from "../../store/mechanic/mechanic.actions";

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

  @Select(HeroesState.heroes) heroes$: Observable<Hero[]>;
  @Select(RaceState.races) races$: Observable<Race[]>;
  @Select(RarityState.rarity) rarities$: Observable<Rarity[]>;
  @Select(TypeState.types) types$: Observable<Type[]>;
  @Select(MechanicState.mechanics) mechanics$: Observable<Mechanic[]>;

  filters: {
    heroes: number | null,
    race: number | null,
    packSet: number | null,
    rarity: number | null,
    type: number | null,
    mechanic: number | null
  }

  constructor(private store: Store) {
    this.filters = {
      heroes: null,
      race: null,
      packSet: null,
      rarity: null,
      type: null,
      mechanic: null
    };
  }

  ngOnInit(): void {
    this.store.dispatch([
      new GetAllRaces(),
      new GetAllHeroes(),
      new GetAllRarities(),
      new GetAllTypes(),
      new GetAllMechanics()
    ]);
  }
}
