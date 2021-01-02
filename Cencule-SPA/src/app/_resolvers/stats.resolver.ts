import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { PhotoService } from '../_services/photo.service';
import { PhotoWall } from '../_models/photoWall';
import { UserStatistics } from '../_models/userStatistics';
import { StatisticsService } from '../_services/statistics.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StatsResolver implements Resolve<UserStatistics> {
  constructor(
    private statisticsService: StatisticsService,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserStatistics> | Promise<UserStatistics> | UserStatistics {
    return this.statisticsService.getStats(
      this.authService.decodedToken.nameid
    );
  }
}
