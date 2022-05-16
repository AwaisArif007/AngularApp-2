import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; 
import { DocumentService } from 'src/app/Core/Services/Client/Document/document.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css', '../client.component.css', '../../app.component.css']
})
export class CalenderComponent implements OnInit {
  
  calendarOptions: CalendarOptions = {
    
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2022-04-01' ,color: 'purple'},
      { title: 'event 2', date: '2022-04-04' }
    ]
    
  };

  docList: any = [];
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.GetDocumentByMonth();
  }
  
  GetDocumentByMonth(): void {
    this.documentService.GetDocumentByMonth(5)
              .subscribe(
                (response: any) => {
                  this.docList = response.result;
                }) 
    }
}
