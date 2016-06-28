
import {HTTP_PROVIDERS, Http, Response} from '@angular/http';

import { Component } from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/observable';
//import {} from './rxjs-operators';

import {Customer} from './customer';

@Component({
    selector: 'my-app',
    template: '<h1>STILL My First Angular 2 App</h1> <br> <h2>But Im Changing This</h2>',
    providers: [
        HTTP_PROVIDERS
        ] 
})
export class AppComponent {
    constructor(private http: Http) { }

    private customersUrl = 'http://menchiessms.azurewebsites.net/api/customers/1';
       

    getCustomers(): Promise<Customer[]> {
        return this.http.get(this.customersUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }


    private handleError(error: any) {
            // In a real world app, we might use a remote logging infrastructure
            // We'd also dig deeper into the error to get a better message
            let errMsg = (error.message) ? error.message :
               error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);


}
