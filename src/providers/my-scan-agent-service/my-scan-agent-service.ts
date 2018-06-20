import { SearchViewModel } from './../../app/classes/SearchViewModel';
import { Details } from './../../app/classes/Details';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Data } from '../../app/classes/Data';

let apiUrl = 'http://myscanagentidentityapi.azurewebsites.net/';
let token: string = "";
let errorMessage : string = "";
let status : string = "";
let jsonResult : any;
@Injectable()
export class MyScanAgentServiceProvider {
  isLoggedIn: any = new BehaviorSubject<any>({ isLoggedIn: null });
 data : Data[];
  constructor(public http : Http) {}

  loginAccount(email :string , password: string){ 
      
    var obj = { UserName: email, Password: password, grant_type: 'password' };
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

    let body = this.serializeObj(obj);
    this.http.post(apiUrl + "Token",  body, options).subscribe( response => {
      if(response.ok){
        jsonResult = response.json();
        token = jsonResult["access_token"];
        status = "OK";
        errorMessage = "";
        this.isLoggedIn = true;
        localStorage.setItem("token", token);
      }else{
        status = "NOK";
        errorMessage = "Invalid credentials, please verify email and password";
        this.isLoggedIn = false;
      }
    },(error: Response) => {
      if(error.status === 400){
        jsonResult = error.json();
        errorMessage = jsonResult["error_description"];;
      }else{
        errorMessage = "unexpected error:" + error.json();
      }
    });
    return this.isLoggedIn;
  }
  
  private serializeObj(obj) {
      var result = [];
      for (var property in obj)
          result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

      return result.join("&");
  }

  getItems(upc: string): Observable<SearchViewModel[]> {
    console.log("upc",upc);
    var obj = { UPC: upc };
    //var token = window.localStorage.getItem("token");
    var token = "OW49Ik8rF59IwDLLI5kn_udfdxGqYg5KYDXLzvhXkDLQb_3vmaSf2vAhw0rdrfwiFmGW37epqBGsTvKCqkvAGROy0RFvYRYlVy4kGrdoj8fJLz2kELo5tzquyvjNTLfyS_FPD_7s4LNe8guqR4TIB-NKE80vRVaZAn5ZffMLfuWRflK67n8c36qZSKmcuPWSMvgYyDOn7S1uwsHeXlpcpfncMg76jWoaYedG6qKNF6WtPAoU4GqEMU0mujtRZmhbiJQbvX5D31qtglhEkaOQr5lyN0gBN5jFdvKmCSsyvbaqPwRAAyc7f6NXGc8agTVVmcAS4-hTypD00ltSJ2RMRYjTyC4EfhFnIwDeZMu8Rmp-AFnVueqgFSzecKxWmEKjw6PU4wEvSPGnpt7BPj5QZupwrL49vEdPXT5yxWTCMAFR_uDAUy5zCT_23luRlsGQ301px4c2KWSe5kJwFc7zbG33v1qfrRaPxdvV6Qs8R_zqlOBVe5Bz6aeQ7JmRfkKwyp2sDwIhPNvEyG3kzLkwOuLttPippM1ESCYg39y7inpWc5nVdG2j254fdE9h9t0BoLb_TguzlIX500dWwmoxGEsqhqW1CcJDHs5wsKX5QGyZRjSRTEk2_FWAq589iz37CG7KBZOzRQce0pYFYsKdmCi8oprltXgTpBI64LXrgEgR474O65gzG6ohdst_oX7t";
    let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
    headers.append('Content-Type', 'application/json');
    headers.append( "Authorization", "Bearer " + token);
    let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    let body = this.serializeObj(obj);

     const response = this.http.post(apiUrl + "api/offersu",JSON.stringify(obj),  options).map(res => res.json());
console.log(response);
console.log(SearchViewModel);
    return response;
    
  }
  GetAll(upc) {
  }
  extractData(res: Response){
    let body = res.json();
    return body;
  }

  getLowerOffers(): Observable<Data[]>{
    var headers = new Headers();
    var token = "91rEfrDwr6knun0viUCXRHoxNuAADBOzmCHtssCUuWlJ5K4oUyfslMEOZWK8GWYHszlRUGolDU0z8TxVwBegALmeO5wOwnI3tgbkM5wc9qS6a19urpsWMAnvEggGvmRUs9hGJdPP4ybUlfW57RnQa9nzJlYxZ93FqVfrFh1diXtSiuPNwyQeK4uF73tPU-QOYIMxJXQ8YCemlEAccpI4dQzY3sKlGBEpTuU6utR-7csRDLkhl7nIUxMTmjdOsncUFL9dMz62VNNKJZVrhTGRdHFjlELEDTY37r69GhgwOYUdtyarvprRAHR9eI61ra8axOvMcu2ymYh4BU64XV_rFoWsJuspoYO78ax5ujor8v7h44mPxAbTNAhDLmSPgspzun2WB7a98fLHcVPI-oawxyZh6tOr9HiTswmfGch5IyGo0DYh90VknrNUnUhLy9OaZ25uELtqk48LuvjEOysBDirrGBs6gONz8fidVxw5iRctCWftehMKVsUzgDm42GXGBJojMjHxsVk032RnFbyA5v_okc-joWQCr_xmM77tKGpzY9kcDTMvzln-ES0nR0HJf3Ba0mODrixl5UeQr7Y9IPZTlFxL9YWQGBPIAEitAHd2jW4EvLgiMqLGiK7PmXuvpnVjq5D-DpIpfdztuChKH7bISOWMm0qNjVzbbi48r0ezXk1f4p76sTCPd8I3UOXZ";
    headers.append('Authorization','Bearer' + token);
    headers.append('Content-Type', 'application/json');

    return this.http.post(apiUrl + "api/offersu",{ headers: headers}).map(res => res.json());
  }

}
