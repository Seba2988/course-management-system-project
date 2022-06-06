import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

export interface AuthResData {
  user: {};
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, isStudent: boolean) {
    const url = `http://localhost:3000/${
      isStudent ? 'students' : 'professors'
    }/login`;

    return this.http.post<AuthResData>(url, { email, password }).pipe(
      tap((resData) => {
        this.handleAuth(isStudent, resData.token);
      })
    );
  }

  logout(isStudent: boolean) {
    sessionStorage.removeItem(
      `${isStudent ? 'studentToken' : 'professorToken'}`
    );
    this._isLoggedIn.next(false);

    this.router.navigate(['/login']);
  }

  autoLogin() {
    const studentData = JSON.parse(sessionStorage.getItem('studentToken'));
    if (studentData) {
      const expDate = new Date(studentData.expDate);
      if (expDate >= new Date()) {
        this._isLoggedIn.next(true);
        this.router.navigate(['/student']);
      }
    } else {
      const professorData = JSON.parse(
        sessionStorage.getItem('professorToken')
      );
      if (professorData) {
        const expDate = new Date(professorData.expDate);
        if (expDate >= new Date()) {
          this._isLoggedIn.next(true);
          this.router.navigate(['/professor']);
        }
      }
    }
  }

  private handleAuth(isStudent: boolean, token: string) {
    const expDate = new Date(new Date().getTime() + 3600000);
    sessionStorage.setItem(
      `${isStudent ? 'studentToken' : 'professorToken'}`,
      JSON.stringify({ token, expDate })
    );
    this._isLoggedIn.next(true);
  }

  getProfessorToken() {
    const professorData = JSON.parse(sessionStorage.getItem('professorToken'));
    if (!professorData) throw new Error('Not logged');
    const professorToken = professorData.token;
    return professorToken;
  }
}