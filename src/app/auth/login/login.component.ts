import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';


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
        localStorage.getItem('email') || 'arribas.test@test.com', 
        [ Validators.required, Validators.email ] ],

      password: ['123456', Validators.required ],
      remember: [false]
    });
  }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.loginForm.value)
      .subscribe(resp=>{
        //console.log(resp);

        if(this.loginForm.get('remember')!.value){
          localStorage.setItem('email', this.loginForm.get('email')!.value);

        }else{
          localStorage.removeItem('email');
        }

        //Navegar al dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        //Si sucede un error
        Swal.fire('Error', err.msg, 'error');
        localStorage.setItem('email', this.loginForm.get('email')!.value);

      }); 
  }
}
