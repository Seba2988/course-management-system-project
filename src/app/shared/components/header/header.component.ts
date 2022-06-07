import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  onHome() {
    let tokenData = JSON.parse(sessionStorage.getItem('studentToken'));
    if (!tokenData) {
      tokenData = JSON.parse(sessionStorage.getItem('professorToken'));
      if (!tokenData) return this.router.navigate(['/login']);
      return this.router.navigate(['/professors']);
    }
    return this.router.navigate(['/students']);
  }

  onLogout() {
    const isStudent = sessionStorage.getItem('studentToken') ? true : false;
    this.loginService.logout(isStudent);
    this.router.navigate(['/login']);
  }
}
