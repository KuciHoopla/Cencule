import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserForBlog } from '../_models/userForBlog';
import { BlogService } from '../_services/blog.service';

@Injectable()
export class UsersForBlogsResolver implements Resolve<UserForBlog[]> {
  constructor(
    private blogService: BlogService  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserForBlog[]> | Promise<UserForBlog[]> | UserForBlog[] {
    // tslint:disable-next-line: no-string-literal
    return this.blogService.getUsersForBlogs();
  }
}
