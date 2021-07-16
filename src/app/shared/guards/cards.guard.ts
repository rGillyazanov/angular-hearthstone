import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from "@ngxs/store";
import { GetAllCards } from "../../store/cards/cards.actions";
import { catchError, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CardsGuard implements CanActivate {

  constructor(private store: Store) {
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(state => state.cards.data.length !== 0).pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          return this.store.dispatch(new GetAllCards());
        }
        return of(true);
      }),
      take(1)
    );
  }

}
