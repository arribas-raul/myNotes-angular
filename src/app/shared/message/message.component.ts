import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/models/responseData.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{

  public response: ResponseData;

  constructor(public httpService: HttpService) { 
    this.response = httpService.response;
  }
}
