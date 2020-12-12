import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../_models/blog';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  blogs: Blog[];
  users: User[];

  ngOnInit() {
    this.route.data.subscribe((data: { blogs: Blog[] }) => {
      this.blogs = data.blogs;
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
