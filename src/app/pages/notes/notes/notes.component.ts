import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { Subject } from 'src/app/models/subject.model';
import { NoteService } from 'src/app/services/note.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public subject: Subject;
  public list: Note[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private noteService: NoteService
  ) { 
    this.subject = undefined;
    this.list = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.getSubject(Number(id));
    this.getList(Number(id));
  }

  /*Public functions ***************************/
  public navigateDetailNote(id: number = undefined){
    const id_note: string = id === undefined ? '' :  String(id);

    this.router.navigate(
      [`note/${id_note}`], 
      { relativeTo: this.route });
  }

  public delete(index: number){
    if (!confirm('Are you Sure?')) {
      return;
    } 

    const note = this.list[index];

    this.noteService.delete(note)
      .subscribe((resp: Subject) =>{
        this.list.splice(index, 1);

      }, err => {
        console.log(err);
      });
  }

  /*Private functions **************/
  private getSubject(id: number){
    this.subjectService.get(id)
      .subscribe((subject: Subject) => {;
        this.subject = subject;
      });
  }

  private getList(id: number){
    this.noteService.list(id)
    .subscribe((list:Note[]) =>{
      this.list.push(...list);

    }, err => {
      console.log(err);
    });
  }

}
