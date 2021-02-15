import { NgModule } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';

import { DashboardComponent } from './dashboard/dashboard.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OfferComponent } from './offer/offer.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ClaimOfferComponent } from './claim-offer/claim-offer.component'


@NgModule({
    imports: [
        GooglePlaceModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        appRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSliderModule,
        MatCardModule,
        MatProgressBarModule,
        MatDialogModule,
        MatRadioModule,
        MatInputModule,
        HttpClientModule,
        MatTabsModule,
        MatSnackBarModule,
        
    ],
    declarations: [
        DashboardComponent,
        AppComponent,
        HomeComponent,
        OfferComponent,
        ClaimOfferComponent
        
		],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
