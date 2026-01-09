import { Component } from '@angular/core';
import { AuthService } from './auth/application/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav *ngIf="authService.isAuthenticated()">
      <ul>
        <li><a routerLink="/dashboard">Home</a></li>
        <li><a routerLink="/loans">Préstamos</a></li>
        <li style="float:right"><a (click)="logout()" style="cursor:pointer">Logout</a></li>
      </ul>
    </nav>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    nav { background: #333; overflow: hidden; }
    nav ul { list-style-type: none; margin: 0; padding: 0; }
    nav li { float: left; }
    nav li a { display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none; }
    nav li a:hover { background-color: #111; }
    .main-content { padding: 20px; }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
