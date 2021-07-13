import { Component, Inject, OnInit } from '@angular/core';
import { AppConfigType } from "../../../config/app.config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject('APP_CONFIG') public appConfig: AppConfigType) {
  }

  ngOnInit(): void {
  }

}
