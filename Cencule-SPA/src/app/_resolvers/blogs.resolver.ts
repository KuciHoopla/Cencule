import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { BlogService } from '../_services/blog.service';
import { Blog } from '../_models/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogsResolver implements Resolve<Blog[]> {
  constructor(private blogAddService: BlogService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Blog[]> | Promise<Blog[]> | Blog[] {
    return this.blogAddService.getBlogs();
  }
}
