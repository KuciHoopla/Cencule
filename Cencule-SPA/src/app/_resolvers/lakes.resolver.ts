import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LakeService } from '../_services/lake.service';
import { LakeWall } from '../_models/lakeWall';

@Injectable({
  providedIn: 'root'
})
export class LakesResolver implements Resolve<LakeWall[]> {
  constructor(private lakeService: LakeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<LakeWall[]> | Promise<LakeWall[]> | LakeWall[] {
    return this.lakeService.getLakes();
  }
}
