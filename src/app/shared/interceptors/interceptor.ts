import { SharedServiceService } from '../shared-service.service';  
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()

export class AppInterceptor implements HttpInterceptor {
    totalRequest = 0;
    constructor(
        public router: Router,
        public sharedService: SharedServiceService
    ) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.totalRequest = 0;
            }
        });
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.totalRequest++;
        this.sharedService.updateLoader(true);
        const authToken = localStorage.getItem('loggedInUserToken') ? (JSON.parse(localStorage.getItem('loggedInUserToken') as string)) : '';
        const requestToHandle = authToken
            ? request.clone({
                headers: request.headers.set('Authorization', `Bearer ${authToken}`)
            })
            : request;
        return next.handle(requestToHandle).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.status && (event.status === 200 || 201)) {
                    if (this.totalRequest > 0) {
                        this.totalRequest--;
                    }
                    if (this.totalRequest === 0) {
                        this.sharedService.updateLoader(false);
                    }
                }
            }
        }, (error) => {            
            this.totalRequest--;
            this.sharedService.updateLoader(false);
            if (error.status === 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            } else {
                return throwError(error);
            }
            return false
        }));
    }
}
