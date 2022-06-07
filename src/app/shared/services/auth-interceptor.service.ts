import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // return next.handle(req);
    return this.loginService.isLoggedIn.pipe(
      take(1),
      exhaustMap((isLogged) => {
        if (!isLogged) return next.handle(req);
        const professorToken = this.loginService.getProfessorToken();
        if (professorToken) {
          const modifiedReq = req.clone({
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${professorToken}`,
            }),
          });
          return next.handle(modifiedReq);
        }
        const studentToken = this.loginService.getStudentToken();
        if (!studentToken) return next.handle(req);
        const modifiedReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${studentToken}`,
          }),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
