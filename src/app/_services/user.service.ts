import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
	private 	RolesAndPermission	= new BehaviorSubject({name: 'Maradona'});
	public 		rolesData			: Observable<any>;
	constructor(private http: HttpClient) {
		this.rolesData = this.RolesAndPermission.asObservable();

	}
	

		getAll(data) {
		const  params = new HttpParams({fromObject:data})
		  let promise = new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}api/users`, {params})
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

		AddUser(data) {
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/add-user`, data)
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

		deleteUser(id:number) {
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/delete-user/${id}`,{id:id})
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
		
		getUser(id,requestType=null) {
			var data 		=	{id:id};
			const  params 	= 	new HttpParams({fromObject:data})
		  	let promise 	= 	new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}api/user`,{params})
			  .toPromise()
			  .then(
				res => { // Success
					resolve(res);
					if(requestType !='editUser'){
						this.RolesAndPermission.next(res);
					}
				},
				msg => { // Error
					reject(msg);
				}
			  );
		  });
		  return promise;
		}
		
		
		editUser(id:number,data:any) {
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/edit-user/${id}`,data)
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

		updateProfile(id:number,data:any) {
		  let promise = new Promise((resolve, reject) => {
			this.http.put<any>(`${environment.apiUrl}api/update-profile/${id}`,data)
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

		getRoles(data:any) {
		const  params = new HttpParams({fromObject:data})
		  let promise = new Promise((resolve, reject) => {
			this.http.get<any>(`${environment.apiUrl}api/roles`,{params})
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

		addRoles(data:any) {
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/add-role`,data)
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
		editRole(id,data:any) {
		  let promise = new Promise((resolve, reject) => {
			this.http.put<any>(`${environment.apiUrl}api/edit-role/${id}`,data)
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
		
		getRoleRow(role_id) {
		  let promise = new Promise((resolve, reject) => {
			this.http.post<any>(`${environment.apiUrl}api/view-role/${role_id}`,{id:2})
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
		
		deleteRole(id) {
		  let promise = new Promise((resolve, reject) => {
			this.http.delete<any>(`${environment.apiUrl}api/delete-role/${id}`)
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
