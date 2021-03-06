import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../_models/blog';
import { UserForBlog } from '../_models/userForBlog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl + 'blog');
  }

  getUsersForBlogs(): Observable<UserForBlog[]> {
    return this.http.get<UserForBlog[]>(this.baseUrl + 'home/users');
  }
}
