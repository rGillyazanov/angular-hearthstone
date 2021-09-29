import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAllCards } from "../../../store/cards/cards-state.model";
import { CardsService } from "../../../shared/services/cards/cards.service";
import { Select, Store } from "@ngxs/store";
import { GetCardsOfPage } from "../../../store/cards/cards.actions";
import { CardsState } from "../../../store/cards/cards.state";
import { Observable } from "rxjs";
import { CardsFilterState } from '../../../store/cards-filter/cards-filter.state';

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

  @Select(CardsState.loading) loadingCards$: Observable<boolean>;
  @Select(CardsState.loaded) loadedCards$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  setCardImage(idCard: string) {
    return CardsService.setCardImage(idCard);
  }

  getPage(page: number) {
    const filter = this.store.selectSnapshot(CardsFilterState);

    this.store.dispatch(new GetCardsOfPage({
      page: page,
      filteredParameters: filter
    }));
  }
}
