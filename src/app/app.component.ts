import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/pages/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/pages/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/pages/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/pages/Archived', icon: 'archive' },
    { title: 'Trash', url: '/pages/Trash', icon: 'trash' },
    { title: 'Spam', url: '/pages/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
