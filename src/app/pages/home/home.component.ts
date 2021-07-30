import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { CardsState } from "../../store/cards/cards.state";
import { IAllCards } from "../../store/cards/cards-state.model";
import { CardsFilterStateModel } from "../../store/cards-filter/cards-filter-state.model";
import { CardsFilterState } from "../../store/cards-filter/cards-filter.state";

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

  @Select(CardsFilterState) filters: CardsFilterStateModel;

  constructor() {
  }

  ngOnInit(): void {
  }
}
