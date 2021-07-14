import { Component, Inject, OnInit } from '@angular/core';
import { AppConfigType } from "../../../config/app.config";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(@Inject('APP_CONFIG') public appConfig: AppConfigType) {
    setTimeout(() => {}, 3000);
  }

  ngOnInit(): void {
  }

}
