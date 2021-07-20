import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutsModule } from "./layouts/layouts.module";
import { RouterModule } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { NgxPaginationModule } from "ngx-pagination";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { CardsComponent } from './pages/home/cards/cards.component';

import { environment } from "../environments/environment";
import { appConfig } from "../config/app.config";
import { appRoutes } from "./app.router";

import { CardsState } from "./store/cards/cards.state";
import { NgSelectModule } from "@ng-select/ng-select";
import { HeroesState } from "./store/heroes/heroes.state";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    LayoutsModule,
    AuthModule,
    HttpClientModule,
    NgxsModule.forRoot([
      CardsState,
      HeroesState
    ], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.access_token'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'APP_CONFIG',
      useValue: appConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
