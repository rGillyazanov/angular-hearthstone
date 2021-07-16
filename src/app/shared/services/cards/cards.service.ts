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

  getAllCards(): Observable<CardsStateModel> {
    return this.http.get<CardsStateModel>('/api/cards').pipe(
      map(response => response.data as any)
    );
  }
}
