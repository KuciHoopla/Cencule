import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Message } from '../_models/message';
import { Check } from '../_models/check';

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

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  getUsersWall(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  blockUser(id: number, idToBlock: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id + '/' + idToBlock, user);
  }

  changePassword(id: number, newPassword: string, veryfication: string) {
    return this.http.put(
      this.baseUrl +
        'users/change/' +
        id +
        '/' +
        newPassword +
        '/' +
        veryfication,
      {}
    );
  }

  oldPassword(name: string, oldPassword: string) {
    return this.http.get<Check>(
      this.baseUrl + 'users/veryfication/' + name + '/' + oldPassword,
      {}
    );
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

  getMessages(id: number) {
    return this.http.get<Message[]>(
      this.baseUrl + 'users/' + id + '/messages/'
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

  deleteUser(idUser: number, id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + idUser + '/' + id);
  }
}
