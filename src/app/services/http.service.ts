
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

  public setResponse(msg: string, showMsg: boolean = false){
    if(showMsg){
      this.response.status = 'OK';
      this.response.msg = msg;
    }
  }

  public setError(error: any, showMsg: boolean = false){
    if(error.code === 401){
      return this.userService.closeSession(true);
    }

    this.setResponse(error.response, showMsg);
  }
}
