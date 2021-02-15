import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '@app/_services';
import { UserService } from '@app/_services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	subject = new Subject<boolean>();
    constructor(
        private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		
		this.authenticationService.getSiteSettings()
					.then((result:any) => {
						
				})
				.catch((error) => {
					
				});
		
		return new Promise((resolve) => {
			let userData	=	JSON.parse(localStorage.getItem('currentUser'));
			if(userData !=null){
					this.userService.getUser(userData.userId)
						.then((result:any) => {
							if(route.data.name == 'dashboard' || route.data.type == 'allow'){
								resolve(true);
							}else{
								if(this.checkPermission(result.role_permission,route.data.name) == false){
									this.router.navigate(['/dashboard']);
									 resolve(false);
								}else{
									 resolve(true);
								}
							}
					})
					.catch((error) => {
						resolve(false);
					});
				
			}else{
				this.router.navigate(['/']);
				resolve(false);
				
			}
		})
		
    }
	
	getUrlByData(key){
		var currentUrl = '';
		for (var i = 0; i < this.router.config.length; i++) {
			if(this.router.config[i].path == 'claims'){		
				for (var j = 0; j < this.router.config[i].children.length; j++) {
					if(this.router.config[i].children[j].data.name == key){
						currentUrl = this.router.config[i].children[j].path;
					}
				}
			}
		}
		return currentUrl;
	}
	
	
	firstObj(jsObjects){
		if(jsObjects != undefined){
			let  data  = jsObjects.filter(obj => {
						return obj.permission_value==1;
					})
			return data;

		}
	}	
	nextObj(jsObjects,key){
		
		var index		= 	jsObjects.findIndex(x => x.permission_key == key);
		var obj 		=	"";
		var keepGoing 	= 	true;
		for (var i = index; i < jsObjects.length; i++) {
		  if(keepGoing) {
			if(jsObjects[i].permission_value==1){
				obj 		=	jsObjects[i];
				keepGoing 	= 	false;
			}
		  }
		}
		return obj;
	}	
	
	checkPermissionKey(jsObjects,key){
		if(jsObjects != undefined){
			let  data  = jsObjects.filter(obj => {
						return obj.permission_key == key;
					})
			if(data.length){
				return true;
			}else{
				return false;
			}

		}
	}	
	
	checkPermission(jsObjects,key){
		if(jsObjects != undefined){
			let  data  = jsObjects.filter(obj => {
						return obj.permission_key == key && obj.permission_value==1;
					})
			if(data.length){
				return true;
			}else{
				return false;
			}

		}
	}
}