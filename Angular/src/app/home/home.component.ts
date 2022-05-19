import { Component, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import {Observable} from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router';
import { PensionerDetail } from '../_models';
import { UserService, AuthenticationService ,PensioncalculatorService} from '../_services';
import{PensioncalculatorComponent} from '../_pensioncalculator/pensioncalculator.component'

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    //pensionerdetails: PensionerDetail[];
    pensionerdetails:Observable<PensionerDetail[]>;  
    pensionercalculatelist: any;


    constructor(private userService: UserService,private router:Router,private pensioncalculatorService:PensioncalculatorService) { }
    private pensionerDetail=new  PensionerDetail();

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(data => {
            this.loading = false;
            this.pensionerdetails=data
    });
}

    getPensionercalculator(aadharNumber:any){
        
         this.router.navigate(['calculatepension',aadharNumber])
    }
}