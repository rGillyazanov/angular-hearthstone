import { Component, Inject, OnInit } from '@angular/core';
import { AppConfigType } from "../../../../config/app.config";

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  constructor(@Inject('APP_CONFIG') public appConfig: AppConfigType) {
  }

  ngOnInit(): void {
  }

}
