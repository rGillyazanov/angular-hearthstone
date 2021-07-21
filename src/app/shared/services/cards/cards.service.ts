import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CardsStateModel } from "../../../store/cards/cards-state.model";
import { map } from "rxjs/operators";
import { IFiltersCards } from "../../models/filters-types";

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

  getFilteredOfCards(parameters: IFiltersCards): Observable<CardsStateModel> {
    const filteredParameters: { [x: string]: string; } = {};

    if (parameters.heroes) {
      filteredParameters['hero_id'] = parameters.heroes.toString();
    }
    if (parameters.rarity) {
      filteredParameters['rarity_id'] = parameters.rarity.toString();
    }
    if (parameters.type) {
      filteredParameters['type_id'] = parameters.type.toString();
    }
    if (parameters.race) {
      filteredParameters['race_id'] = parameters.race.toString();
    }
    if (parameters.packSet) {
      filteredParameters['packset_id'] = parameters.packSet.toString();
    }
    if (parameters.mechanic) {
      filteredParameters['mechanics'] = parameters.mechanic.toString();
    }

    let params = new HttpParams().appendAll(filteredParameters);

    return this.http.get<CardsStateModel>('/api/cards/search', {
      params: params
    }).pipe(
      map(response => response.data as any)
    );
  }
}
