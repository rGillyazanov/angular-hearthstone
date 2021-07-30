import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAllCards } from "../../../store/cards/cards-state.model";
import { CardsService } from "../../../shared/services/cards/cards.service";
import { Select, Store } from "@ngxs/store";
import { GetCardsOfPage } from "../../../store/cards/cards.actions";
import { CardsState } from "../../../store/cards/cards.state";
import { Observable } from "rxjs";
import { CardsFilterStateModel } from "../../../store/cards-filter/cards-filter-state.model";

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

  cardsFilter: CardsFilterStateModel;
  @Select(CardsState.loading) loadingCards$: Observable<boolean>;
  @Select(CardsState.loaded) loadedCards$: Observable<boolean>;

  constructor(private store: Store,
              private cardsService: CardsService) { }

  ngOnInit(): void {
    /**
     * Объект currentFiltersOfCards содержит состояние фильтра карт.
     * Используется для того, чтобы сохранить текущее состояние, которое будет использоваться
     * для передачи параметров в запрос при осуществлении пагинации по результатам фильтрации.
     */
    this.cardsService.currentFiltersOfCards.subscribe(filter => {
      this.cardsFilter = filter;
    });
  }

  setCardImage(idCard: string) {
    return CardsService.setCardImage(idCard);
  }

  getPage(page: number) {
    this.store.dispatch(new GetCardsOfPage({
      page: page,
      filteredParameters: this.cardsFilter
    }));
  }
}
