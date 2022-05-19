import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { PensionerDetail } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private expenseRestUrl = 'http://localhost:8200/pensioner/api/v1';
    private httpOptions = {
       headers: new HttpHeaders( { 'Content-Type': 'application/json' })
    }
    constructor(private http: HttpClient) { }

    getAll():Observable<any> {
        return this.http.get<PensionerDetail[]>(
            `${this.expenseRestUrl}/getAllPensioner`,this.httpOptions
        );
    }

    getPensioner(aadharNumber:any):Observable<object>{
        return this.http.get(
            `${this.expenseRestUrl}/PensionerDetailByAadhaar/${aadharNumber}`,this.httpOptions
        );
    }
}