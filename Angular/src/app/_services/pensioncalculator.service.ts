import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { PensionerDetail } from '../_models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PensioncalculatorService {
  private expenseRestUrl = 'http://localhost:8100/process/api/v1/PensionDetail';
    private httpOptions = {
       headers: new HttpHeaders( { 'Content-Type': 'application/json'
      })
    }

  constructor(private http: HttpClient) { }
  getPensionercalculator(value:any):Observable<any>{
    return this.http.post<PensionerDetail[]>(
        this.expenseRestUrl,value,this.httpOptions);
}
}
