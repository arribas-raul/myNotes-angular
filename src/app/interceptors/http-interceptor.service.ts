import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(public userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.token}`,
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle( reqClone ).pipe(
      catchError( this.errorProcess )
    );
  }
  
  errorProcess( _error: HttpErrorResponse) {
    //console.log('Sucedió un error');
    //console.log('Registrado en el log file');
    //console.warn('error', error.error.msg);
    let error = _error.error;
    error.code = _error.status;

    let msg = [];
    
    if(typeof error.msg  === "string"){
      msg.push(error.msg);

    }else if(_error.error.response.msg.errors !== undefined){
      
      const count = _error.error.response.msg.errors.length;

      for(let i=0; i<count; i++){
        msg.push(_error.error.response.msg.errors[i].msg);
      }

      error.response.msg = msg;
    }

    return throwError(error);
  }
}
