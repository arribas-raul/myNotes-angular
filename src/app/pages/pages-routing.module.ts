import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './notes/notes/notes.component';
import { NoteComponent } from './notes/note/note.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [ AuthGuard ],
      children: [
        { 
          path: '', 
          canActivate: [ AuthGuard ],
          component: DashboardComponent, 
          data: { title: 'Dashboard' }
        },
        { 
          path: 'subject/:id', 
          canActivate: [ AuthGuard ],
          component: NotesComponent, 
          data: { title: 'Notes' }
        },
        { 
          path: 'subject/:id/note', 
          canActivate: [ AuthGuard ],
          component: NoteComponent, 
          data: { title: 'New Note' }
        },
        { 
          path: 'subject/:id/note/:id_note', 
          canActivate: [ AuthGuard ],
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
