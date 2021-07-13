import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SubheaderComponent } from './header/subheader/subheader.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubheaderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
