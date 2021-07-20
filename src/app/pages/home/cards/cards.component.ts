import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAllCards } from "../../../store/cards/cards-state.model";
import { CardsService } from "../../../shared/services/cards/cards.service";
import { Store } from "@ngxs/store";
import { ChangePage } from "../../../store/cards/cards.actions";

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

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  setCardImage(idCard: string) {
    return CardsService.setCardImage(idCard);
  }

  getPage(page: number) {
    this.store.dispatch(new ChangePage({ page: page }))
  }
}
