import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      name: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ], 
      password2: ['', Validators.required ]
    }, 
    {
      validators: this.passwordsEquals('password', 'password2')
    });

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) { }

  public createUser(){
    this.formSubmitted = true;

    if(this.registerForm.invalid){
      return;
    }

    this.userService.register(this.registerForm.value)
      .subscribe(resp=>{
        localStorage.removeItem('email');
        //Navegar al dashboard
        this.router.navigateByUrl('/');

      }, (err: HttpErrorResponse) => {
        console.log('err', err);
        Swal.fire('Error', err.error, 'error');
      });      
  }

  public invalidField(field: string): boolean{
    if(this.registerForm.get(field)!.invalid && this.formSubmitted){
      return true;
    }

    return false;
  }

  public invalidPasswords(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
  
    if (pass1 !== pass2 && this.formSubmitted){
      return true;
    }

    return false;
  }

  public passwordsEquals(password1: string, password2: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password1);
      const pass2Control = formGroup.get(password2);
    
      if(pass1Control!.value === pass2Control!.value){
        pass2Control!.setErrors(null);
      
      }else{
        pass2Control!.setErrors({notIsEqual: true});
      }
    }
  }
}
