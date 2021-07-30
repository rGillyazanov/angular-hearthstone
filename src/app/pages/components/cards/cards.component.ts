import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAllCards } from "../../../store/cards/cards-state.model";
import { CardsService } from "../../../shared/services/cards/cards.service";
import { Select, Store } from "@ngxs/store";
import { GetCardsOfPage } from "../../../store/cards/cards.actions";
import { CardsFilterStateModel } from "../../../store/cards-filter/cards-filter-state.model";
import { CardsFilterState } from "../../../store/cards-filter/cards-filter.state";
import { CardsState } from "../../../store/cards/cards.state";
import { Observable } from "rxjs";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit {
  @Input() cards: IAllCards[] | null;
  @Input() totalCards: any;
  @Input() perPage: any;
  @Input() currentPage: any;

  @Select(CardsFilterState) cardsFilter: CardsFilterStateModel;
  @Select(CardsState.loading) loadingCards$: Observable<boolean>;
  @Select(CardsState.loaded) loadedCards$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  setCardImage(idCard: string) {
    return CardsService.setCardImage(idCard);
  }

  getPage(page: number) {
    this.store.dispatch(new GetCardsOfPage({
      page: page,
      filteredParameters: this.cardsFilter
    }))
  }
}
