import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class VehiclesService {

	constructor(private http: HttpClient) {
	}

		getYears(data) {
		const  params = new HttpParams({fromObject:data})
		// console.log(params)
		  let promise = new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}`, {params})
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					// this.currentUserSubject.next(res);
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}

		getModels(data){

			const  params = new HttpParams({fromObject:data})
		// console.log(params)
		  let promise = new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}`, {params})
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					// this.currentUserSubject.next(res);
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}

		getModelByMake(data){
			const  params = new HttpParams({fromObject:data})
		// console.log(params)
		  let promise = new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}`, {params})
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					// this.currentUserSubject.next(res);
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
			
		}
		


		getVehicleByVIM(data) {
			const  params = new HttpParams({fromObject:data})
		  	let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.vimApiUrl}`, params)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					// this.currentUserSubject.next(res);
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}
		
		getOffer(data){
			const  params = new HttpParams({fromObject:data})
		  	let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}?action=getOffer`, params)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					// this.currentUserSubject.next(res);
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}

		claimOffer(data){
			const  params = new HttpParams({fromObject:data})
		  	let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}?action=claimOffer`, params)
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					// this.currentUserSubject.next(res);
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}


  
}
