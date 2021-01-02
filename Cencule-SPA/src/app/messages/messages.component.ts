import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  users: User[];
  userId = this.authService.decodedToken.nameid;
  ids = [0];
  chatUserId = -1;
  newMessage: any = {};
  chatMessages: Message[];
  switchId: string;
  selectedUserControl = new FormControl();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.userId = Number(this.userId);
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Naozaj vymazat?', () => {
      this.userService
        .deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(
          () => {
            this.messages.splice(
              this.messages.findIndex((m) => m.id === id),
              1
            );
            this.alertify.success('Vymazane');
          },
          (error) => {
            this.alertify.error('Nepodarilo sa vymazat spravu');
          }
        );
    });
  }

  loadMessages() {
    let filteredMessages: Message[] = [];
    this.userService
      .getMessages(this.authService.decodedToken.nameid)
      .subscribe((data) => {
        this.messages = data;

        for (const message of this.messages) {
          if (!this.ids.find((id) => id === message.senderId)) {
            filteredMessages.push(message);
            this.ids.push(message.senderId);
          } else if (!this.ids.find((id) => id === message.recipientId)) {
            filteredMessages.push(message);
            this.ids.push(message.recipientId);
          }
        }

        filteredMessages = filteredMessages.filter(
          (element) => element.senderId !== 0 || element.recipientId !== 0
        );
      });
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  switchClass(userId) {
    const elements = document.getElementsByClassName('user-cell');
    for (var e = 0; e < elements.length; e++) {
      elements[e].classList.remove('active');
    }
    const classList = document.getElementById(userId).classList;
    if (!classList.contains('active')) {
      document.getElementById(userId).classList.add('active');
    }
    this.chatUserId = Number(userId);
    this.filterMessages();
    this.switchId = String(userId);
  }

  sendMessage() {
    this.newMessage.recipientId = this.chatUserId;
    this.userService.sendMessage(this.userId, this.newMessage).subscribe(
      (message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      },
      (error) => {
        this.alertify.error('problem poslat spravu');
      }
    );
    setTimeout(() => {
      this.switchClass(this.switchId);
    }, 100);
  }

  filterMessages() {
    const filteredMessages: Message[] = [];
    for (const message of this.messages) {
      if (
        (message.recipientId === this.userId &&
          message.senderId === this.chatUserId) ||
        (message.recipientId === this.chatUserId &&
          message.senderId === this.userId)
      ) {
        filteredMessages.push(message);
      }
    }
    this.chatMessages = filteredMessages;
  }

  changeView() {
    document.getElementById('cells-container').classList.add('hidden');
    document.getElementById('message-body').classList.add('showed');
    document.getElementById('card').style.display = 'block';
    document.getElementById('btn-back').classList.add('btn-active');
  }

  backToUsers() {
    document.getElementById('cells-container').classList.remove('hidden');
    document.getElementById('message-body').classList.remove('showed');
    document.getElementById('card').style.display = 'none';
    document.getElementById('btn-back').classList.remove('btn-active');
  }

  selectUser() {
    const newUserId = Number(this.selectedUserControl.value);
    if (!this.ids.includes(newUserId)) {
      this.ids.unshift(newUserId);
    }
    setTimeout(() => {
      this.switchClass(newUserId);
    }, 200);
    setTimeout(() => {
      document.getElementById(String(newUserId)).classList.add('active');
    }, 100);
    document.getElementById('btn-back').classList.add('btn-active');

    this.changeView();
    this.selectedUserControl.reset();
  }
}
