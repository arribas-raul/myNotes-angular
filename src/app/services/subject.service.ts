import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/subject.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private url = 'subject';

  constructor(
    private http: HttpClient, 
    private httpService: HttpService){

    }

    public list(){
      this.httpService.clearMsgServer();

      return this.http.get<Subject[]>(
        `${environment.base_url}${this.url}`)
        .pipe(
          map((resp: any) => {
            const {response, data} = resp;

            this.httpService.setResponse(response);

            const count = data.length;

            let list: Subject[] = [];

            for(let i=0; i<count; i++){
              list.push(new Subject(
                data[i].name,
                data[i].description,
                data[i].id
              ));
            }
            
            return list;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public get(id: number){
      this.httpService.clearMsgServer();

      return this.http.get<Subject>(
        `${environment.base_url}${this.url}/${id}`)
        .pipe(
          map((resp: any) => {
            //console.log('resp', resp);
            const {response, data} = resp;

            this.httpService.setResponse(response);

            const subject = new Subject(
              data.name,
              data.description,
              data.id
            );
            
            return subject;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public create(subject: Subject){
      this.httpService.clearMsgServer();

      return this.http.post<any>(
        `${environment.base_url}${this.url}`, subject)
        .pipe(
          map((resp: any) => {
            const response = resp.response;
            const subject: Subject = resp.data;

            this.httpService.setResponse(response);

            console.log('subject', subject);
            
            return subject;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public update(subject: Subject){
      this.httpService.clearMsgServer();

      return this.http.put<any>(
        `${environment.base_url}${this.url}`, subject)
        .pipe(
          map((resp: any) => {
            const {response, data} = resp;
            this.httpService.setResponse(response);
            
            return data;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public delete(subject: Subject){
      this.httpService.clearMsgServer();

      return this.http.delete<any>(
        `${environment.base_url}${this.url}/${subject.id}`)
        .pipe(
          map((resp: any) => {

            console.log('resp', resp);

          
            const {response, data} = resp;
            this.httpService.setResponse(response);
            
            return data;
          }
        ),
  
        catchError( error => {
          console.log('error', error);
          this.httpService.setError(error);
  
          throw(error);
        }));
    }
}
