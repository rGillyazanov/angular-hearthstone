import { Component, OnInit } from '@angular/core';
import { routerPaths } from "../../app.router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  routerPaths;

  constructor() {
    this.routerPaths = routerPaths;
    setTimeout(() => {}, 3000);
  }

  ngOnInit(): void {
  }

}
