import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { IResponseServer } from "../../shared/models/iresponse-server";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient) { }

  getCardsOfHero(id: number): Observable<any> {
    return this.http.get<IResponseServer>('/api/cards/hero/' + id).pipe(
      map(response => (response.data))
    );
  }
}
