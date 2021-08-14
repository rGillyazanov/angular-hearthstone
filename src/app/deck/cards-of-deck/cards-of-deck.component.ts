import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Select, Store } from "@ngxs/store";
import { DeckState } from "../store/deck/deck.state";
import { GetCardsOfHero, GetHeroOfDeck } from "../store/deck/deck.actions";
import { Deck, ICardInDeck } from "../store/deck/deck-state.model";
import { DeckService } from "../services/deck.service";

@Component({
  selector: 'app-cards-of-deck',
  templateUrl: './cards-of-deck.component.html',
  styleUrls: ['./cards-of-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsOfDeckComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Select(DeckState.cards) cards$: Observable<ICardInDeck[]>;
  @Select(DeckState.cardsOfHeroLoading) cardsLoading$: Observable<boolean>;
  @Select(DeckState.cardsOfHeroLoaded) cardsLoaded$: Observable<boolean>;

  @Select(DeckState.heroOfDeckLoading) heroLoading$: Observable<boolean>;
  @Select(DeckState.heroOfDeckLoaded) heroLoaded$: Observable<boolean>;

  @Select(DeckState.deck) deck$: Observable<Deck>;

  constructor(private deckService: DeckService,
              private router: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    this.router.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const heroId = params['id'];
      this.getHero(heroId);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getHero(id: number) {
    this.store.dispatch([
      new GetHeroOfDeck(id),
      new GetCardsOfHero(id)
    ]).pipe(
      takeUntil(this.destroy$)
    );
  }

  countOfCardInDeck(card: ICardInDeck): number {
    return this.deckService.countOfCardsInDeck(card);
  }

  countOfDeck(): number {
    return this.deckService.costOfDeck();
  }

}
