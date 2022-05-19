import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {UserService, AuthenticationService } from '../_services';
import { PensionerDetail } from '../_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pensiondetails',
  templateUrl: './pensiondetails.component.html',
  styleUrls: ['./pensiondetails.component.css']
})
export class PensiondetailsComponent implements OnInit {
  pensionForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  pensionerdetaillist:any;  
   private pensionDetail =new PensionerDetail();

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.pensionForm = this.formBuilder.group({
      aadharNumber: ['', Validators.required]
  });
  }
   // convenience getter for easy access to form fields
   get g() { return this.pensionForm.value; }

   onClick() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.pensionForm.invalid) {
           return;
       }
         this.pensionDetail.aadharNumber=this.AadharNumber.value;

       this.loading = true;
       this.userService.getPensioner(this.pensionDetail.aadharNumber)
           .pipe(first())
           .subscribe(
               data => {
                 this.loading=false;
                   this.pensionerdetaillist=data;
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });
   }
   get AadharNumber(){
     return this.pensionForm.get('aadharNumber');
   }

}
