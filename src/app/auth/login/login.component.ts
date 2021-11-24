import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm: FormGroup; 

  constructor( 
    private router: Router, 
    private fb: FormBuilder, 
    private userService: UserService,
    private ngZone: NgZone ) { 

    this.loginForm = this.fb.group(
    {
      email: [
        localStorage.getItem('email') || '', 
        [ Validators.required, Validators.email ] ],

      password: ['', Validators.required ],
      remember: [false]
    });
  }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.loginForm.value)
      .subscribe(resp=>{

        if(this.loginForm.get('remember')!.value){
          localStorage.setItem('email', this.loginForm.get('email')!.value);

        }else{
          localStorage.removeItem('email');
        }

        //Navegar al dashboard
        this.router.navigateByUrl('/');

      }, (err: HttpErrorResponse) => {
        //Si sucede un error
        console.log('paso por aqui');
        Swal.fire('Error', err.error, 'error');
        //localStorage.setItem('email', this.loginForm.get('email')!.value);

      }); 
  }
}
