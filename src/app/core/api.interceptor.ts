import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exemplo: adicionar headers se preciso futuramente
    const cloned = req.clone({
      // setHeaders: { 'X-Requested-With': 'Angular' }
    });
    return next.handle(cloned);
  }
}
