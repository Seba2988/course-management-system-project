import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, isStudent: boolean): Observable<any> {
    const role: string = isStudent ? 'student' : 'professor';
    const url: string = `${environment.ServerHost}/${role}/login`;
    return this.http.post(url, { email, password, role }).pipe(
      tap((response: any) => {
        this.handleAuth(isStudent, response);
      })
    );
  }

  logout(isStudent: boolean) {
    const url = `${environment.ServerHost}/${
      isStudent ? 'student' : 'professor'
    }/logout`;
    this.http.get(url).subscribe({
      next: () => {
        sessionStorage.removeItem(
          `${isStudent ? 'studentToken' : 'professorToken'}`
        );
        this._isLoggedIn.next(false);
        this.router.navigate(['/login']);
      },
    });
  }
  autoLogin() {
    const studentData = JSON.parse(sessionStorage.getItem('studentToken'));
    if (studentData) {
      const expDate = new Date(studentData.expDate);
      if (expDate >= new Date()) {
        this._isLoggedIn.next(true);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      const professorData = JSON.parse(
        sessionStorage.getItem('professorToken')
      );
      if (professorData) {
        const expDate = new Date(professorData.expDate);
        if (expDate >= new Date()) {
          this._isLoggedIn.next(true);
        } else {
          this.router.navigate(['/login']);
        }
      }
    }
  }
  private handleAuth(isStudent: boolean, response: any) {
    const expDate = new Date(new Date().getTime() + 3600000);
    const token = response.result.token;
    const userId = response.result.userId;
    sessionStorage.setItem(
      `${isStudent ? 'studentToken' : 'professorToken'}`,
      JSON.stringify({ token, expDate, userId })
    );
    this._isLoggedIn.next(true);
  }

  getProfessorToken(): void | string {
    const professorData = JSON.parse(sessionStorage.getItem('professorToken'));
    if (!professorData) return;
    const professorToken = professorData.token;
    return professorToken;
  }

  getStudentToken(): void | string {
    const studentData = JSON.parse(sessionStorage.getItem('studentToken'));
    if (!studentData) return;
    const studentToken = studentData.token;
    return studentToken;
  }
}
