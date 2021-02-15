
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VehiclesService } from '@app/_services';
import { SnackBar } from '@app/_helpers/snackBar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
             
@Component({ templateUrl: 'home.component.html' })      
export class HomeComponent {
    loading          = false;
    submitted        = false;
    formProcess      = false;
    backButton       = false;
    disableSubmit    = false;
    crossButton      = false;
    disableOdo       = false;
    VIMdetail        = null;
    prevIndex        = null;
    routeArray       = [];
    value            = 0;
    lastStepValue    = 0;
    selectedTabIndex = 0;
    message          = '';
    YearsOriginal    : any; 
    MakesOriginal    : any;
    ModelsOriginal   : any;
    Years            : any; 
    Makes            : any;
    Models           : any;
    modelByMake      : any;
    vehicleForm      : any;

    constructor(
        private formBuilder	: FormBuilder,
        private snackBar:SnackBar,
        private router: Router,
        private modalService: NgbModal,
        private vehiclesService:VehiclesService,
    ) {
        this.vehicleForm = this.formBuilder.group({            
            'VIN'                       :   [''],
            'year'                      :   ['', Validators.required],
            'make'                      :   ['', Validators.required],
            'model'                     :   ['', Validators.required],
            'newcqyear'                 :   ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
            'newcqmake'                 :   ['', Validators.required],
            
        });


    }

    ngOnInit() {

     
         
        var yearsData = localStorage.getItem('yearsData');
        if(yearsData !=undefined){
            this.YearsOriginal=this.Years = JSON.parse(localStorage.getItem('yearsData'));
        }else{
            var data = {action:'getModelYears'}
            this.vehiclesService.getYears(data)
            .then((result:any) => {
                if(result.status==true){
                    localStorage.setItem('yearsData', JSON.stringify(result.data));
                    this.YearsOriginal = this.Years = result.data;
                    
                }
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }



    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            console.log(result,'Closed')
        }, (reason) => {
            console.log(reason,'09')
            let modalName = content._declarationTContainer.localNames[0];
            if(modalName == 'flatTireModal' && reason !='nextIndex'){
                this.vehicleForm.get('com_tire_condition').setErrors({'required': true})
            }
        });
    }

 

}
