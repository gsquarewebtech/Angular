import { Component,Inject } from '@angular/core';
import { Router,ActivatedRoute ,   Event as RouterEvent,  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService,VehiclesService } from './_services';
import { LoaderService } from '@app/_services/loader.service';
import { UserService} from '@app/_services/user.service';
import { Meta } from '@angular/platform-browser';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    showNavMenu	=	 false;
    showMenu	=	 false;
    loading		=	 true;
    currentUser	:	 any;
	rolesData	:	any;
    isHome		: string = 'yes' ;
	logo		= '';
	powered_by	= '';

    constructor(
		private userService: UserService,
		private meta: Meta,
        private router: Router,
		private activatedRoute:ActivatedRoute,
		private authenticationService: AuthenticationService,
		private vehiclesService:VehiclesService,
		private loaderService:LoaderService,
		@Inject(DOCUMENT) private _document: HTMLDocument
    ) {
		   this.router.events.subscribe((e : RouterEvent)=> {
			 this.navigationInterceptor(e);
		   if(this.router.url == '/' || this.router.url == '/dashboard' || this.router.url == '/login'|| this.router.url == '/thank-you'){
				this.isHome = 'yes';
			}else{
				this.isHome = '';
			}
		   });
		   
		this.userService.rolesData.subscribe(x => {
			this.rolesData	=	x.role_permission;
			
		}); 
	
		
        this.authenticationService.currentUser.subscribe(x => {
			this.isHome = 'yes';
			this.currentUser = x;
		});  
		
		this.loaderService.loaderState.subscribe(x => {
			this.loading = x.show;
		});    
		
		
		
		
		
	}
	
		showHideMenu() {
			this.showMenu	= !this.showMenu;
		}		
		showHideNavMenu() {
			this.showNavMenu	= !this.showNavMenu;
		}	

		onActivate(event) {
			window.scroll(0,0);
			
		}
	
	
		navigationInterceptor(event: RouterEvent): void {
			this.showNavMenu	=	 false;
			this.showMenu	=	 false;

			if (event instanceof NavigationStart) {
			  this.loading = true
			}
			if (event instanceof NavigationEnd) {
			  this.loading = false
			}

			// Set loading state to false in both of the below events to hide the spinner in case a request fails
			if (event instanceof NavigationCancel) {
			  this.loading = false
			}
			if (event instanceof NavigationError) {
			  this.loading = false
			}
		}


	checkPermission(jsObjects,key){
		if(jsObjects != undefined){
			let  data  = jsObjects.filter(obj => {
						return obj.permission_key === key && obj.permission_value===1;
					})
			if(data.length){
				return true;
			}else{
				return false;
			}

		}
	}


	log(val) { console.log(val); }


    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
