import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url = 'note';

  constructor(
    private http: HttpClient, 
    private httpService: HttpService){

    }

    public get(id: number){
      this.httpService.clearMsgServer();

      return this.http.get<Note>(
        `${environment.base_url}${this.url}/${id}`)
        .pipe(
          map((resp: any) => {
            const {msg, data} = resp;

            this.httpService.setResponse(msg);

            const note = new Note(
              data.id_subject,
              data.name,
              data.note,
              data.updated_at,
              data.id
            );
            
            return note;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public list(id: number){
      this.httpService.clearMsgServer();

      return this.http.get<Note[]>(
        `${environment.base_url}${this.url}/list/${id}`)
        .pipe(
          map((resp: any) => {
            const {msg, data} = resp;

            this.httpService.setResponse(msg);

            let list: Note[] = [];

            if(data !== undefined){
              const count = data.length;

              for(let i=0; i<count; i++){
                list.push(new Note(
                  data[i].id_subject,
                  data[i].name,
                  data[i].note,
                  data[i].updated_at,
                  data[i].id
                ));
              }
            }
            
            return list;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public create(note: Note){
      this.httpService.clearMsgServer();

      return this.http.post<any>(
        `${environment.base_url}${this.url}`, note)
        .pipe(
          map((resp: any) => {
            const {msg, data} = resp;

            note.id = resp.data.id;
            note.date = resp.data.updated_at;

            this.httpService.setResponse(msg, true);
            
            return note;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public update(note: Note){
      this.httpService.clearMsgServer();

      return this.http.put<any>(
        `${environment.base_url}${this.url}`, note)
        .pipe(
          map((resp: any) => {
            const {msg, data} = resp;
            this.httpService.setResponse(msg, true);
            
            return data;
          }
        ),
  
        catchError( error => {
          this.httpService.setError(error);
  
          throw(error);
        }));
    }

    public delete(note: Note){
      this.httpService.clearMsgServer();

      return this.http.delete<any>(
        `${environment.base_url}${this.url}/${note.id}`)
        .pipe(
          map((resp: any) => {
            const {msg, data} = resp;
            this.httpService.setResponse(msg, true);
            
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
