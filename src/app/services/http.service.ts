
import { Injectable } from '@angular/core';
import { ResponseData } from '../models/responseData.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public response: ResponseData;

  constructor(private userService: UserService) { 
    this.response = new ResponseData();
  }

  public clearMsgServer(){
    this.response.status = '';
    this.response.msg    = '';
  }

  public setResponse(response: ResponseData, showMsg: boolean = false){
    console.log('response', response);
    if(response !== undefined){
      if(response.status === 'OK' || (showMsg && response.status === 'KO')){
        this.response.status = response.status;
        this.response.msg = response.msg;
      }
    }
  }

  public setError(error: any, showMsg: boolean = false){
    if(error.code === 401){
      return this.userService.closeSession(true);
    }

    this.setResponse(error.response, showMsg);
  }
}
