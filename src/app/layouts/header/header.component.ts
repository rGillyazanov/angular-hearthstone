import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AppConfigType } from "../../../config/app.config";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart, Router
} from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { AuthState } from "../../auth/store/auth/auth.state";
import { Logout } from "../../auth/store/auth/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public loaderSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  routerLoaderTimout: any;
  routerSubscription: Subscription;

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean> | undefined;

  constructor(@Inject('APP_CONFIG') public appConfig: AppConfigType,
              private store: Store,
              private router: Router) {
    this.routerSubscription = this.routerProgressBar();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    if (this.routerLoaderTimout) {
      clearTimeout(this.routerLoaderTimout);
    }
  }

  /**
   * Обрабатывает событие загрузки страницы при роутинге.
   */
  routerProgressBar(): Subscription {
    return this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderSubject.next(10);
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loaderSubject.next(65);
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loaderSubject.next(90);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loaderSubject.next(100);
        if (this.routerLoaderTimout) {
          clearTimeout(this.routerLoaderTimout);
        }
        this.routerLoaderTimout = setTimeout(() => {
          this.loaderSubject.next(0);
        }, 500);
      }
    });
  }

  logout() {
    if (this.isAuthenticated$) {
      this.store.dispatch(new Logout());
    }
  }
}
