import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { IResponseServer } from "../../shared/models/iresponse-server";
import { ICardInDeck } from "../store/deck/deck-state.model";
import { Store } from "@ngxs/store";
import { DeckState } from "../store/deck/deck.state";
import { CardsService } from "../../shared/services/cards/cards.service";
import { FormatType } from 'deckstrings';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private cardsService: CardsService,
              private http: HttpClient,
              private store: Store) { }

  getCardsOfHero(id: number, page?: number, format?: FormatType): Observable<any> {
    let httpParams = new HttpParams();

    if (page) {
      httpParams = httpParams.append('page', page);
    }

    if (format) {
      httpParams = httpParams.append('format', format);
    }

    return this.http.get<IResponseServer>('/api/cards/hero/' + id, {
      params: httpParams
    }).pipe(
      map(response => (response.data))
    );
  }

  countOfCardsInDeck(card: ICardInDeck): number {
    const deck = this.store.selectSnapshot(DeckState.deck);
    return <number>deck?.cards?.find(cardInDeck => cardInDeck.card.dbfId === card.dbfId)?.count;
  }

  countAllOfCardsInDeck(): number {
    const deck = this.store.selectSnapshot(DeckState.deck);
    return deck.cards.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.count;
    }, 0);
  }

  isCardExits(card: ICardInDeck) {
    const deck = this.store.selectSnapshot(DeckState.deck);

    return deck.cards?.some((cardInDeck) => {
      return cardInDeck.card.dbfId === card.dbfId;
    });
  }

  costOfDeck() {
    const deck = this.store.selectSnapshot(DeckState.deck);

    return deck.cards?.reduce((cost, cardInDeck) => {
      return cost + CardsService.getCostOfCard(cardInDeck.card?.rarity?.id).common * cardInDeck.count;
    }, 0);
  }
}
