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
import { NgSelectModule } from "@ng-select/ng-select";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { CardsComponent } from './pages/components/cards/cards.component';

import { environment } from "../environments/environment";
import { appConfig } from "../config/app.config";
import { appRoutes } from "./app.router";

import { storeAppModule } from "./store/index.store";
import { CardsFilterComponent } from './pages/components/cards-filter/cards-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CardsComponent,
    CardsFilterComponent
  ],
  imports: [
    BrowserModule,
    LayoutsModule,
    AuthModule,
    HttpClientModule,
    NgxsModule.forRoot(storeAppModule, {
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
