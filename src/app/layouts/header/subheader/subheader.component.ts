import { Component, OnInit } from '@angular/core';
import { routerPaths } from "../../../app.router";

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  routerPaths;

  constructor() {
    this.routerPaths = routerPaths;
  }

  ngOnInit(): void {
  }

}
