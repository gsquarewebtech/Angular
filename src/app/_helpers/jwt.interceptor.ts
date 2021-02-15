import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable,Subject,throwError  } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '@app/_services/loader.service';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  
  private loaderSubject = new Subject<any>();
  public loaderState = this.loaderSubject.asObservable();
  
  
    constructor(
        private router		            : Router,
        private loaderService         : LoaderService,
        private authenticationService : AuthenticationService
      ) { }
	
	


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const isLoggedIn = currentUser && currentUser.apiToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.apiToken}`
                }
            });
        }
        this.showLoader();

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => { 
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
          (err: any) => {
            this.onEnd();
        }));
    }


    private onEnd(): void {
      this.hideLoader();
    }  private showLoader(): void {
      this.loaderService.show();
    }  private hideLoader(): void {
      this.loaderService.hide();
    }
}