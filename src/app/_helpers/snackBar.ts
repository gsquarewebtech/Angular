
import { Component, Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

  @Injectable({
    providedIn: 'root'
  })
     
export class SnackBar {
    horizontalPosition		: MatSnackBarHorizontalPosition = 'right';
	verticalPosition		: MatSnackBarVerticalPosition 	= 'top';

    constructor(
        private _snackBar		:   MatSnackBar,
    ) { }

    show(message) {
        this._snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
	}

 }  

