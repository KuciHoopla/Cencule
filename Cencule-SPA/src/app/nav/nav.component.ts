import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  name: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
    this.getUserName();
  }

  getUserName() {
    this.name = '';
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      this.name = user.knownAs;
    } catch (error) {
      // tslint:disable-next-line: no-unused-expression
      ('neprihlaseny');
    }
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Prihlásený');
        this.getUserName();
      },
      (error) => {
        this.alertify.error('Problém s prihlásením');
      },
      () => {
        this.router
          .navigateByUrl('app-nav', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/home']);
          });
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

  loggOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('odhlaseny');
    this.router.navigate(['/home']);
    this.name = '';
  }

  resetPassword() {
    const emailValidity = this.validateEmail(this.model.username);
    if (emailValidity) {
      if (window.confirm('Naozaj chces resetovat heslo pre tento email?')) {
        this.userService.resetPassword(this.model.username).subscribe();
        this.alertify.success('Nove heslo bolo zaslane na email.');
      } else {
        this.alertify.error('Zrusene');
      }
    } else {
      alert('Zly format emailu!');
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
