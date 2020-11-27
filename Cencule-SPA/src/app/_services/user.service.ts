import { Injectable } from '@angular/core';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  [x: string]: any;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id){
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  getUsersWall(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  blockUser(id: number, idToBlock: number, user: User) {
    console.log(id);
    console.log(idToBlock);
    console.log(user);
    return this.http.put(this.baseUrl + 'users/' + id + '/' + idToBlock, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(
      this.baseUrl + 'users/' + id + '/like/' + recipientId,
      {}
    );
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Message[]>(this.baseUrl + 'users/' + id + '/messages/', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  getMessageThreat(id: number, recipientId: number) {
    return this.http.get<Message[]>(
      this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId
    );
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/messages/' + id,
      {}
    );
  }

  markAsRead(userId: number, messageId: number) {
    return this.http
      .post(
        this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read',
        {}
      )
      .subscribe();
  }
}
