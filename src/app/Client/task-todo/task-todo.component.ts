import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from 'src/app/Core/Services/Client/Document/document.service';

@Component({
  selector: 'app-task-todo',
  templateUrl: './task-todo.component.html',
  styleUrls: ['./task-todo.component.css','../../app.component.css']
})
export class TaskTodoComponent implements OnInit {

  taskList: any = [];
  constructor(private toastr: ToastrService,private docService:DocumentService) { }

  ngOnInit(): void {
    this.GetTaskList();
  }
  GetTaskList():void {

    this.docService.GetTaskList().subscribe(
       (response: any) => {
        this.taskList=response.result;
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
}
