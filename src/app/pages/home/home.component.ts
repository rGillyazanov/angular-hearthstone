import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IAllCards } from "../../store/cards/cards-state.model";
import { CardsState } from "../../store/cards/cards.state";
import { HeroesState } from "../../store/heroes/heroes.state";
import { Hero } from "../../shared/models/heroes/hero";
import { GetAllHeroes } from "../../store/heroes/heroes.actions";

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

  filters: {
    heroes: number
  }

  constructor(private store: Store) {
    this.filters = {
      heroes: 0
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllHeroes());
  }
}
