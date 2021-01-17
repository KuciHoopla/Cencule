import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { __values } from 'tslib';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  @Output() admin: boolean;
  users: User[];

  filteredUsers = [];
  // user: User = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};
  userId = this.authService.decodedToken.nameid;

  pagination: Pagination;

  constructor(
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isAdmin();
    this.userId = Number(this.userId);
    this.route.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
    });
  }

  filter() {
    let filterItem = document.getElementById('filter').innerText.toString();
    try {
      for (const user of this.users) {
        if (user.knownAs.toLowerCase().includes(filterItem.toLowerCase())) {
          this.filteredUsers.push(user);
        }
      }
      if (this.filteredUsers.length < 1) {
        this.alertify.error('Nepodarilo sa vyhľadať');
        this.filteredUsers = [];
        filterItem = '';
      }
    } catch {
      this.alertify.error('Chyba vo vyhľadávaní');
      filterItem = '';
    }
    filterItem = '';
  }

  clear() {
    this.filteredUsers = [];
    this.alertify.error('Vyhľadávanie zrušené');
  }

  isAdmin() {
    const activeUserId = this.authService.decodedToken.nameid;
    let status;
    this.userService.getUser(activeUserId).subscribe((user: User) => {
      status = user.admin;
      if (status === 1) {
        this.admin = true;
      } else {
        this.admin = false;
      }
    });
  }
}
