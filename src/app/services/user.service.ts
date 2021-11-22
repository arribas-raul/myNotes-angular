import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/registerform.interface';
import { LoginForm } from '../interfaces/loginForm.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const gapi: any;   


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  private _user: User;

  constructor(
    private http: HttpClient, 
    private router: Router) { 
      this._user = new User('', '');
  }

  /*Public functions************************/
  get headers(){
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      }
    }
  }

  saveLocalStorage(token: string){
    localStorage.setItem('token', token);
  }

  validateToken(): Observable<boolean>{
    return this.http.get(`${environment.base_url}auth/checkSession`, this.headers)
    .pipe(
      map((resp: any) => {
        const data = resp.user;

        this.user = new User(
          data.name, 
          data.email);
      
        return true;
      }),
      catchError( error => of(false))//Recoge el error y devuelve false
    );
  }

  register(formData: RegisterForm){

    return this.http.post(`${environment.base_url}auth/register`, formData)
      .pipe(
        map( (resp: any) => {
          this.saveLocalStorage(resp.token);
      }));
  }

  login(formData: LoginForm){
    return this.http.post(`${environment.base_url}auth/login`, formData)
      .pipe(
        tap( (resp: any) => {
          this.saveLocalStorage(resp.token);
      }));
  }

  logout(){
    return this.http.get(`${environment.base_url}auth/logout`, this.headers)
    .pipe(
      tap( (resp: any) => {
        this.closeSession();
      }));
  }

  closeSession(auto: boolean = false){
    this.user = new User("", "");

    if(auto){
      auto = this.token !== "";
    }

    localStorage.removeItem('token');
    
    this.router.navigateByUrl(
      auto ? '/expired' : '/login');
  }

  /*Getters and Setters********************************/
  get user(): User{
    return this._user;
  }

  set user(model: User){
    this._user = model;
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
}
