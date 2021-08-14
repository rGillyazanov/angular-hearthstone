import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { IResponseServer } from "../../shared/models/iresponse-server";
import { ICardInDeck } from "../store/deck/deck-state.model";
import { Store } from "@ngxs/store";
import { DeckState } from "../store/deck/deck.state";
import { CardsService } from "../../shared/services/cards/cards.service";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private cardsService: CardsService,
              private http: HttpClient,
              private store: Store) { }

  getCardsOfHero(id: number): Observable<any> {
    return this.http.get<IResponseServer>('/api/cards/hero/' + id).pipe(
      map(response => (response.data))
    );
  }

  countOfCardsInDeck(card: ICardInDeck): number {
    const deck = this.store.selectSnapshot(DeckState.deck);
    let count = 0;

    deck.cards.forEach(cardInDeck => {
      if (cardInDeck.dbfId === card.dbfId) {
        count++;
      }
    });

    return count;
  }

  isCardExits(card: ICardInDeck) {
    const deck = this.store.selectSnapshot(DeckState.deck);

    return deck.cards.some((cardInDeck) => {
      return cardInDeck.dbfId === card.dbfId;
    });
  }

  costOfDeck() {
    const deck = this.store.selectSnapshot(DeckState.deck);

    return deck.cards.reduce((cost, cardInDeck) => {
      return cost + CardsService.getCostOfCard(cardInDeck?.rarity?.id).common;
    }, 0);
  }
}
