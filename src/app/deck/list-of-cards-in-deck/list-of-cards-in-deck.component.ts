import { Component, Input, OnInit } from '@angular/core';
import { CardsService } from "../../shared/services/cards/cards.service";
import { Deck, ICardInDeck } from "../store/deck/deck-state.model";
import { Store } from "@ngxs/store";
import { AddCardInDeck } from "../store/deck/deck.actions";

@Component({
  selector: 'app-list-of-cards-in-deck',
  templateUrl: './list-of-cards-in-deck.component.html',
  styleUrls: ['./list-of-cards-in-deck.component.scss']
})
export class ListOfCardsInDeckComponent implements OnInit {

  @Input() cards: ICardInDeck[] | null;
  @Input() deck: Deck | null;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  setImageCard(idCard: string) {
    return CardsService.setCardImage(idCard);
  }

  addCardInDeck(card: ICardInDeck) {
    this.store.dispatch(new AddCardInDeck(card));
  }
}
