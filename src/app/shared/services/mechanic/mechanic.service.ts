import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Mechanic } from "../../models/filters-types";
import { IResponseServer } from "../../models/iresponse-server";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  constructor(private http: HttpClient) { }

  getMechanicsList(): Observable<Mechanic[]> {
    return this.http.get<IResponseServer>('/api/mechanics').pipe(
      map(response => (response.data as Mechanic[]))
    );
  }
}
