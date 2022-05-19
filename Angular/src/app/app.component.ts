import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import {PensionerDetail} from './_models'

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser:User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe((data: User)=> this.currentUser = data);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}