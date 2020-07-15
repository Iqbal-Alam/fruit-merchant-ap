import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as request from "../../assets/mock/requestMapping"
import { RecordStore } from '../state/record.store';
import { Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  url:any;
  
  constructor(private http:HttpClient, private store: RecordStore) {
    this.url = "http://localhost:3000/";
  }

  getFormFields() {
    const restMethod = request.default.fields.method;
    return this.http.get(request.default.fields.url);
  }

  getJsonData() {
    const restMethod = request.default.history.method;
    return this.http.get(request.default.history.url);
  }

  // getLogin(data) {
  //   const restMethod = request.default.connection.method;
  //   return this.http.get(request.default.connection.url,
  //     {responseType: 'text'});
    
  // }
  getLogin(data) {
    const restMethod = request.default.connection.url;
    this.http.post<any>(restMethod, { loginData: data }).subscribe(data => {
      const returnedData = data.id;
      console.log('returnedData',returnedData);
    })
  }

  sendPostRequest(data: any, endpoint:any): Observable<any> {
    return this.http.post<any>(this.url + endpoint, data);
  }

  getSellingHistory(endpoint) {
    console.log(this.url + endpoint);
    return this.http.get(this.url + endpoint);
  }
    
}
