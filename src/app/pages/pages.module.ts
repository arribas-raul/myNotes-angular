import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CKEditorModule } from 'ng2-ckeditor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes/notes.component';
import { NoteComponent } from './notes/note/note.component';

@NgModule({
  
  declarations: [
    DashboardComponent,
    NotesComponent,
    NoteComponent
  ],

  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CKEditorModule
  ],

  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MatDialogConfig,  useValue: [] }
  ],
  
  entryComponents: [  ]
})

export class PagesModule { }
