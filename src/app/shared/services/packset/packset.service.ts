import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { PackSet } from "../../models/filters-types";
import { IResponseServer } from "../../models/iresponse-server";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PacksetService {

  constructor(private http: HttpClient) { }

  getPackSetList(): Observable<PackSet[]> {
    return this.http.get<IResponseServer>('/api/packsets').pipe(
      map(response => (response.data as PackSet[]))
    );
  }
}
