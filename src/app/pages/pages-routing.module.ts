import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './notes/notes/notes.component';
import { NoteComponent } from './notes/note/note.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
      children: [
        { 
          path: '', 
          component: DashboardComponent, 
          data: { title: 'Dashboard' }
        },
        { 
          path: 'subject/:id', 
          component: NotesComponent, 
          data: { title: 'Notes' }
        },
        { 
          path: 'subject/:id/note', 
          component: NoteComponent, 
          data: { title: 'New Note' }
        },
        { 
          path: 'subject/:id/note/:id_note', 
          component: NoteComponent, 
          data: { title: 'Update Note' }
        },
      ]
  }, 
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
