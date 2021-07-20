import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CardsStateModel } from "../../../store/cards/cards-state.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  static setCardImage(idCard: string): string {
    return `https://art.hearthstonejson.com/v1/render/latest/ruRU/256x/${idCard}.png`;
  }

  getAllCards(): Observable<CardsStateModel> {
    return this.http.get<CardsStateModel>('/api/cards').pipe(
      map(response => response.data as any)
    );
  }

  getCardsOfPage(page: number): Observable<CardsStateModel> {
    return this.http.get<CardsStateModel>('/api/cards?page=' + page).pipe(
      map(response => response.data as any)
    );
  }
}
