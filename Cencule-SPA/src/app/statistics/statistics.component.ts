import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../_models/blog';
import { LakeWall } from '../_models/lakeWall';
import { Message } from '../_models/message';
import { PhotoWall } from '../_models/photoWall';
import { User } from '../_models/user';
import { UserStatistics } from '../_models/userStatistics';
import { AuthService } from '../_services/auth.service';
import { StatisticsService } from '../_services/statistics.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  users: User[];
  lakes: LakeWall[];
  photos: PhotoWall[];
  messages: Message[];
  blogs: Blog[];
  statisticsForUser: UserStatistics;
  statisticsForAllUsers: UserStatistics[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private statsService: StatisticsService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getLakes();
    this.getPhotos();
    this.getBlogs();
    this.fillUserStatistics();
  }

  getUsers() {
    this.route.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
    });
  }

  getLakes() {
    this.route.data.subscribe((data: { lakes: LakeWall[] }) => {
      this.lakes = data.lakes;
    });
  }

  getPhotos() {
    this.route.data.subscribe((data: { photos: PhotoWall[] }) => {
      this.photos = data.photos;
    });
  }

  fillUserStatistics() {
    for (let user of this.users) {
      this.statsService.getStats(user.id).subscribe((data) => {
        this.statisticsForUser = data;
        this.statisticsForUser.userName = user.knownAs;
        this.statisticsForAllUsers.push(this.statisticsForUser);
      });
    }
    console.log(this.statisticsForAllUsers);
  }

  getBlogs() {
    this.route.data.subscribe((data: { blogs: Blog[] }) => {
      this.blogs = data.blogs;
    });
  }
}
