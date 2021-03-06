import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Hero, Mechanic, PackSet, Race, Rarity, Type } from "../../../shared/models/filters-types";
import { Observable, Subject } from "rxjs";
import { Actions, ofActionSuccessful, Select, Store } from "@ngxs/store";

import { FiltersCards } from "../../../store/cards/cards.actions";

import { HeroesState } from "../../../store/heroes/heroes.state";
import { RaceState } from "../../../store/race/race.state";
import { RarityState } from "../../../store/rarity/rarity.state";
import { TypeState } from "../../../store/type/type.state";
import { MechanicState } from "../../../store/mechanic/mechanic.state";
import { CardsFilterState } from "../../../store/cards-filter/cards-filter.state";
import { PackSetState } from "../../../store/packSet/packSet.state";

import {
  SetAttack,
  SetAttackActive,
  SetCost,
  SetCostActive,
  SetHealth,
  SetHealthActive,
  SetHero,
  SetMechanic, SetPackSet,
  SetRace,
  SetRarity,
  SetSort,
  SetType
} from "../../../store/cards-filter/cards-filter.actions";
import { CardsService } from '../../../shared/services/cards/cards.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cards-filter',
  templateUrl: './cards-filter.component.html',
  styleUrls: ['./cards-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsFilterComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  // Filters select options
  @Select(HeroesState.heroes) heroes$: Observable<Hero[]>;
  @Select(RaceState.races) races$: Observable<Race[]>;
  @Select(RarityState.rarity) rarities$: Observable<Rarity[]>;
  @Select(TypeState.types) types$: Observable<Type[]>;
  @Select(PackSetState.packSets) packSets$: Observable<PackSet[]>;
  @Select(MechanicState.mechanics) mechanics$: Observable<Mechanic[]>;

  // Filters cards
  @Select(CardsFilterState.sortOptions) sortOptions$: Observable<Array<{ label: string; field: { type: string; name: string; } }>>;
  @Select(CardsFilterState.costActive) costActive$: Observable<boolean>;
  @Select(CardsFilterState.healthActive) healthActive$: Observable<boolean>;
  @Select(CardsFilterState.attackActive) attackActive$: Observable<boolean>;
  @Select(CardsFilterState.attack) attack$: Observable<number>;
  @Select(CardsFilterState.cost) cost$: Observable<number>;
  @Select(CardsFilterState.health) health$: Observable<number>;

  constructor(private store: Store,
              private actions: Actions,
              private cardsService: CardsService) {
  }

  ngOnInit(): void {
    this.actions.pipe(
      ofActionSuccessful(FiltersCards),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const filterState = this.store.selectSnapshot(CardsFilterState);
      this.cardsService.currentFiltersOfCards.next(filterState);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  filteredCards() {
    const filterState = this.store.selectSnapshot(CardsFilterState);
    this.store.dispatch(new FiltersCards(filterState));
  }

  valueOfPropertyCard(value: number | null) {
    if (!value) return 0;

    return value >= 10 ? `${ value }+` : value;
  }

  changeHero(hero: number | null) {
    this.store.dispatch(new SetHero(hero));
  }

  changeRace(race: number | null) {
    this.store.dispatch(new SetRace(race));
  }

  changeRarity(rarity: number | null) {
    this.store.dispatch(new SetRarity(rarity));
  }

  changeType(type: number | null) {
    this.store.dispatch(new SetType(type));
  }

  changePackSet(packSet: number | null) {
    this.store.dispatch(new SetPackSet(packSet));
  }

  changeMechanic(mechanic: number | null) {
    this.store.dispatch(new SetMechanic(mechanic));
  }

  changeSort(sort: { type: string; name: string; }) {
    this.store.dispatch(new SetSort(sort));
  }

  switchHealthFilter($event: Event) {
    const { checked } = $event.target as HTMLInputElement;
    this.store.dispatch(new SetHealthActive(checked));
  }

  switchAttackFilter($event: Event) {
    const { checked } = $event.target as HTMLInputElement;
    this.store.dispatch(new SetAttackActive(checked));
  }

  switchCostFilter($event: Event) {
    const { checked } = $event.target as HTMLInputElement;
    this.store.dispatch(new SetCostActive(checked));
  }

  changeCost($event: Event) {
    const cost = +($event.target as HTMLInputElement).value;
    this.store.dispatch(new SetCost(cost));
  }

  changeAttack($event: Event) {
    const attack = +($event.target as HTMLInputElement).value;
    this.store.dispatch(new SetAttack(attack));
  }

  changeHealth($event: Event) {
    const health = +($event.target as HTMLInputElement).value;
    this.store.dispatch(new SetHealth(health));
  }
}
