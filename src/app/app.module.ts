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
import { CardsModule } from "./cards/cards.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { environment } from "../environments/environment";
import { appConfig } from "../config/app.config";
import { appRoutes } from "./app.router";

import { storeAppModule } from "./store/index.store";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    LayoutsModule,
    CardsModule,
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
