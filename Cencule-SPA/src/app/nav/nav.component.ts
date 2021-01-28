import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    alert('Naozaj chces resetovat heslo?');

    const emailValidity = this.validateEmail(this.model.username);
    if (emailValidity) {
    } else {
      alert('Zly format emailu!');
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
