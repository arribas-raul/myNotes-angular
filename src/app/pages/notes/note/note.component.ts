import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService} from 'src/app/services/note.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  public note: Note;
  public title: String;

  public ckeConfig!: CKEDITOR.config;
  public ckeditor!: CKEditorComponent;

  public noteForm: FormGroup; 
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private fb: FormBuilder,
    private location: Location) { 
    this.note = undefined;
    this.title = '';

    this.noteForm = this.fb.group(
      {
        name: [this.note != undefined ? this.note.name : '', [ Validators.required] ],
        note: [this.note != undefined ? this.note.note : '', Validators.required ]
      });
  }

  ngOnInit(): void {
    this.configHtmlEditor();

    const id_subject = this.route.snapshot.paramMap.get('id');
    const id_note = this.route.snapshot.paramMap.get('id_note');

    this.note = new Note(Number(id_subject));

    if(id_note !== null){
      this.note.id = Number(id_note);
      this.title = 'Update Note';

      this.getData();

    }else{
      this.title = 'Create new Note';
    }   
  }

  public close(){
    this.location.back();
  }

  public save(){
    this.note.name = this.noteForm.controls['name'].value;
    this.note.note = this.noteForm.controls['note'].value;

    if(this.note.id === undefined){
      this.createNote();

    }else{
      this.updateNote();
    }
  }

  /*Private functions **************/
  private getData(){
    this.noteService.get(this.note.id)
      .subscribe((data: Note) => {;
        this.note = data;
        this.noteForm.controls['name'].setValue(this.note.name);
        this.noteForm.controls['note'].setValue(this.note.note);
      });
  }

  private configHtmlEditor(){
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      toolbarGroups : [ 
        { 
          name: 'basicstyles', 
          groups: [ 
           'basicstyles', 
           'cleanup', 
           'colors',
           'styles', 
           'list', 
           'indent',  
           'align' 
          ] 
        },
        { 
          name: 'paragraph',   
          groups: [ 
            'list', 
            'indent',  
            'align'
          ] 
        }
      ]
    };
  }

  private createNote(){
    this.noteService.create(this.note)
      .subscribe((resp: Note) =>{
        

      }, err => {
        console.log(err);
      });
}

private updateNote(){
  
  this.noteService.update(this.note)
    .subscribe((resp:any) =>{
      

    }, err => {
      console.log(err);
    });
}

}
