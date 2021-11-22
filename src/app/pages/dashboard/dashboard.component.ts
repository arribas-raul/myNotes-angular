import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subject.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public list: Subject[];
  
  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.list = [];
  }

  ngOnInit(): void {
    this.getData();
  }

  public getNotePage(id: number){
    this.router.navigate(
      [`subject/${id}`], 
      { relativeTo: this.route });
  }

  async openModal(index: number = undefined){
    let subject: Subject = new Subject('', '');

    let title = 'New Subject'; 

    if(index !== undefined){
      subject = this.list[index];

      title = 'Update Subject';
    }


    const { value: formValues } = await Swal.fire({
      title,
      html:

        `<input id="subject_name" 
                class="swal2-input" 
                placeholder="Add a subject name"
                value="${subject.name}">

        <textarea id="subject_description" 
                  class="swal2-textarea" 
                  placeholder="Add a description">${subject.description}</textarea>`,

      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText:'Save',
      preConfirm: () => {
        subject.name        = (document.getElementById('subject_name') as HTMLInputElement).value;
        subject.description = (document.getElementById('subject_description') as HTMLInputElement).value;

        if(subject.id === undefined){
          this.createSubject(subject);

        }else{
          this.updateSubject(subject);
        }
      }
    });
  }

  public delete(index: number){
    if (!confirm('Are you Sure?')) {
      return;
    } 

    const subject = this.list[index];

    this.subjectService.delete(subject)
      .subscribe((resp: Subject) =>{
        this.list.splice(index, 1);

      }, err => {
        console.log(err);
      });
  }

  private getData(){
    this.subjectService.list()
      .subscribe((list:Subject[]) =>{
        this.list.push(...list);

      }, err => {
        console.log(err);
      });
  }

  private createSubject(subject: Subject){
      this.subjectService.create(subject)
        .subscribe((resp: Subject) =>{
          this.list.push(resp);

        }, err => {
          console.log(err);
        });
  }

  private updateSubject(subject: Subject){
    
    this.subjectService.update(subject)
      .subscribe((resp:any) =>{
        

      }, err => {
        console.log(err);
      });
}

}
