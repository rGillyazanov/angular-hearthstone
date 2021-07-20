import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IAllCards } from "../../store/cards/cards-state.model";
import { CardsState } from "../../store/cards/cards.state";
import { CardsService } from "../../shared/services/cards/cards.service";
import { ChangePage } from "../../store/cards/cards.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(CardsState.data) allCards$: Observable<IAllCards[]>;

  @Select(CardsState.nextPageUrl) nextPageUrl$: Observable<string>;
  @Select(CardsState.previousPageUrl) prevPageUrl$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  setCardImage(idCard: string) {
    return CardsService.setCardImage(idCard);
  }

  changePage(url: string) {
    this.store.dispatch(new ChangePage({ url: url }))
  }

}
