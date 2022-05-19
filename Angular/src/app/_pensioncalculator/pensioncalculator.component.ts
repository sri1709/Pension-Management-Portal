import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {Observable} from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router';
import{HomeComponent} from '../home/home.component'
import { PensionerDetail } from '../_models';
import { UserService, AuthenticationService,PensioncalculatorService} from '../_services';



@Component({
  selector: 'app-pensioncalculator',
  templateUrl: './pensioncalculator.component.html',
  styleUrls: ['./pensioncalculator.component.css']
})
export class PensioncalculatorComponent implements OnInit {
  pensionerCallist:any;
  pensionerDetail:PensionerDetail;
  error='';
  
  constructor( private route: ActivatedRoute,
    private router: Router,private userService: UserService,private pensionCalulator:PensioncalculatorService)
    {  
  
  }
  

  ngOnInit(): void {
    this.pensionerDetail=new  PensionerDetail();
    this.pensionerDetail.aadharNumber = this.route.snapshot.paramMap.get('aadharNumber');

    this.userService.getPensioner(this.pensionerDetail.aadharNumber)
           .pipe(first())
           .subscribe(
               data => {
                this.pensionCalulator.getPensionercalculator(data).
                pipe(first()).subscribe(data => {
                 this.pensionerCallist=data
                 //this.gotoList()
                })
             }, error => console.log(error));
 
                   /*this.pensionerCallist=data;
               },
               error => {
                   this.error = error;
               });

             /*  this.pensionCalulator.getPensionercalculator(this.pensionerDetail).
               pipe(first()).subscribe(data => {
                this.pensionerCallist=new PensionerDetail()
                this.gotoList()
            }, error => console.log(error));

              }*/
            }
gotoList() {
  this.router.navigate(['/view-student']);
}
}
