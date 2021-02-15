import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { OfferComponent } from './offer/offer.component';
import { ClaimOfferComponent } from './claim-offer/claim-offer.component';

import { AuthGuard } from './_helpers';
import { Role } from './_models';



const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
		data : {name : 'home'}
	},		 
	{
        path: 'offer',
        component: OfferComponent,
    },	
    {
        path: 'claim-offer',
        component: ClaimOfferComponent,
    },			
    // otherwise redirect to home
    { 
		path: '**', 
		component: HomeComponent,		
		
	}
];

export const appRoutingModule = RouterModule.forRoot(routes);
