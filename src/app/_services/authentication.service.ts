import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject	: BehaviorSubject<User>;
    public 	currentUser			: Observable<User>;
    private isHomeSubject		: BehaviorSubject<any>;
    public 	isHome				: Observable<User>;   
	private setting				= new BehaviorSubject({name: 'Maradona'});
    public 	siteSetting			: Observable<any>;
	


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser 		= this.currentUserSubject.asObservable();
        this.isHomeSubject = new BehaviorSubject<any>('yes');
        this.isHome 	 		= this.isHomeSubject.asObservable();
		
		this.siteSetting	=	this.setting.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }


		login(data) {
		  let promise = new Promise((resolve, reject) => {
			  console.log(`${environment.apiUrl}api/login`)
			this.http.post<any>(`${environment.apiUrl}api/login`, data)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					this.currentUserSubject.next(res.data);
					this.isHomeSubject.next('yes');
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}
		
		forgot(data) {
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/forgot-password`, data)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					this.currentUserSubject.next(res.data);
					this.isHomeSubject.next('yes');
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}		
		resetPass(token,data) {
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/reset-password/${token}`, data)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					this.currentUserSubject.next(res.data);
					this.isHomeSubject.next('yes');
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}		
		getSettings() {
		  let promise = new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}api/settings/get`)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);	
					// this.currentUserSubject.next(res.data);
					// this.isHomeSubject.next('yes');
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}	

		getSiteSettings() {
		  let promise = new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}api/settings/get`)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					this.setting.next(res.data);
					// this.isHomeSubject.next('yes');
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}

		
		updateSettings(data) {
			const headers = new HttpHeaders();
          headers.append('Content-Type', 'multipart/form-data');
          headers.append('Accept', 'application/json');
			
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/update-settings`,data, {headers: headers})
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					// this.currentUserSubject.next(res.data);
					// this.isHomeSubject.next('yes');
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}
			

	register(data) {
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/register`,data, {headers: headers})
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('claimId');
        localStorage.removeItem('companyId');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}