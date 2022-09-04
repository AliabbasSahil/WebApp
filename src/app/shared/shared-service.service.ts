import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { appConfig } from '../ap.cconfig';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  
  updateLoader(state:boolean) {
    this.loaderState.next(state);
}

  constructor(
    public httpclient : HttpClient
  ) { }
  
  loaderState = new Subject();
    loaderState$ = this.loaderState.asObservable();
  
  login(data:any){
    const loginUrl = `${appConfig.usermodule}/login/`
    return this.postData(loginUrl,data)
  }

  getMovieList(page:any){
    const url = `${appConfig.maya}/movies/?page=${page}`
    return this.getData(url)
  }

  getData(url:any) {
    return this.httpclient.get<any>(url).pipe(catchError((error) => {
        return this.errorHandler(error);
    }));
}

/**
 * To save data
 * @param data Data to be send
 * @param url API Endpoint
 */
postData(url:any, data:any) {
    return this.httpclient.post<any>(url, data, { observe: 'response' }).pipe(
        catchError((error) => {
            return this.errorHandler(error);
        }));
}


/**
 * Error Handler
 * @param error Error
 */
errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Error');
}


}
