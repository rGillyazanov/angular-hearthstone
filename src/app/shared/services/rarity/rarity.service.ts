import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Rarity } from "../../models/filters-types";
import { IResponseServer } from "../../models/iresponse-server";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RarityService {

  constructor(private http: HttpClient) { }

  getRaritiesList(): Observable<Rarity[]> {
    return this.http.get<IResponseServer>('/api/rarities').pipe(
      map(response => (response.data as Rarity[]))
    );
  }
}
