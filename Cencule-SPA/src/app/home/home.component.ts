import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../_models/blog';
import { User } from '../_models/user';

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
  users: User[];
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
    for (const blog of this.blogs) {
      if (Number(blog.userId) === 11) {
        this.adminBlogs.push(blog);
        this.adminBlogs = this.adminBlogs.filter((i) => i.userId !== -1);
      }
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
