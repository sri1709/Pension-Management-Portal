import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    //private apiUrl: 'http://localhost:8400/auth/api/v1/';
    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private expenseRestUrl = ' http://localhost:8400/auth/api/v1/authenticate';
   private httpOptions = {
      headers: new HttpHeaders( { 'Content-Type': 'application/json' })
   }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(userName:string,password:string) {
        return this.http.post<any>(this.expenseRestUrl,{userName,password},this.httpOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //user.token=window.btoa(username+':'+password)
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}