import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authservice: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    // tslint:disable-next-line: no-string-literal
    return this.userService
      .getMessages(this.authservice.decodedToken.nameid)
      .pipe(
        catchError((error) => {
          this.alertify.error('Chyba pri stahovani sprav');
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }
}
