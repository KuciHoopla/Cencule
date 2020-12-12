import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';

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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMessages();
    this.userId = Number(this.userId);
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
    let filteredMessages: Message[] = [
      {
        id: 0,
        senderId: 0,
        senderKnownAs: '',
        senderPhotoUrl: '',
        recipientId: 0,
        recipientPhotoUrl: '',
        recipientKnownAs: '',
        content: '',
        isRead: true,
        dateRead: null,
        messageSent: null,
      },
    ];
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

  switchClass(i) {
    const elements = document.getElementsByClassName('user-cell');
    for (var e = 0; e < elements.length; e++) {
      elements[e].classList.remove('active');
    }
    const classList = document.getElementById(i).classList;
    if (!classList.contains('active')) {
      document.getElementById(i).classList.add('active');
    }

    const title = document.getElementById(i).title;
    this.chatUserId = Number(title);
    this.filterMessages();
  }

  sendMessage() {
    this.newMessage.recipientId = this.chatUserId;
    this.userService.sendMessage(this.userId, this.newMessage).subscribe(
      (message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  filterMessages() {
    let filteredMessages: Message[] = [
      {
        id: 0,
        senderId: 0,
        senderKnownAs: '',
        senderPhotoUrl: '',
        recipientId: 0,
        recipientPhotoUrl: '',
        recipientKnownAs: '',
        content: '',
        isRead: true,
        dateRead: null,
        messageSent: null,
      },
    ];
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
}
