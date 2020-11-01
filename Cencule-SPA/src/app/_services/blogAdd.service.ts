import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Blog } from '../_models/blog';
import { BlogUpdate } from '../_models/blogUpdate';

@Injectable({
  providedIn: 'root',
})
export class BlogAddService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postBlog(userId: number, blog: Blog) {
    return this.http.post<Blog>(this.baseUrl + 'blog/' + userId, blog);
  }

  updateBlog(id: number, blogUpdate: BlogUpdate) {
    return this.http.put<BlogUpdate>(
      this.baseUrl + 'blog/update/' + id,
      blogUpdate
    );
  }
}
