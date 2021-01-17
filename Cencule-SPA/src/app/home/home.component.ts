import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../_models/blog';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { UsersForBlogsResolver } from '../_resolvers/usersForBlogs.resolver';
import { UserForBlog } from '../_models/userForBlog';
import { BlogService } from '../_services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  blogs: Blog[];
  usersForBlogs: UserForBlog[];
  adminsIds: number[] = [];
  adminBlogs: any[] = [
    {
      description: '',
      id: -1,
      mainUrl: '',
      url: '',
      userId: -1,
      userName: '',
      blocked: '',
      dateAdded: Date.now(),
    },
  ];

  ngOnInit() {
    this.route.data.subscribe((data: { blogs: Blog[] }) => {
      this.blogs = data.blogs;
    });

    this.route.data.subscribe((data: { usersForBlogs: UserForBlog[] }) => {
      this.usersForBlogs = data.usersForBlogs;
    });

    for (const user of this.usersForBlogs) {
      if (user.admin === 1) {
        this.adminsIds.push(user.id);
      }
    }

    for (const blog of this.blogs) {
      if (this.adminsIds.includes(Number(blog.userId))) {
        this.adminBlogs.push(blog);
        this.adminBlogs = this.adminBlogs.filter((i) => i.userId !== -1);
      }
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
