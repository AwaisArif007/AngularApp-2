import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, FullCalendarComponent } from '@fullcalendar/angular'; 
import { DocumentService } from 'src/app/Core/Services/Client/Document/document.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css', '../client.component.css', '../../app.component.css']
})
export class CalenderComponent implements OnInit {
  @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;
  private month: number = new Date().getMonth()+1;
  public year = new Date().getFullYear();
  calendarOptions: CalendarOptions = {
    
    initialView: 'dayGridMonth',
    headerToolbar: {
      right: 'next',
      left: 'prev',
      center:'title',
      },
    editable: true,
    
    customButtons: {
        prev: {
          text: '<',
          click: this.getEventsByMonthBefore.bind(this)
        },
        next: {
            text: '>',
            click: this.getEventsByMonthAfter.bind(this)
            }
        } ,
        
        selectable: true,
   /*  events: [
      { title: 'event 1', date: '2022-05-31' ,color: 'purple'},
      { title: 'event 2', date: '2022-04-04' }
    ] */
    
  };
  CalendarByMonth: any = {
    year: null,
    month: null
    };
  docList: any = [];
  ExpiryDate="";
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  this.GetDocumentByMonth();

  }

  
  getEventsByMonthBefore() {
    
    this.month--;
    if (this.month == -1) {
    this.month = 11;
    this.year--;
    }
    const monthString = this.month > 9 ? this.month.toString() : '0' + this.month.toString();
    this.CalendarByMonth.year=this.year;
    this.CalendarByMonth.month=this.month;
    this.documentService.GetDocumentByMonth(this.CalendarByMonth.month)
    .subscribe(
      (response: any) => {
        this.docList = response.result;
        this.fullcalendar.getApi().removeAllEvents();
        this.fullcalendar.getApi().changeView('dayGridMonth', this.year + '-' + monthString + '-01');
        for (var v of response.result) {
          this.ExpiryDate=formatDate(v.ExpiryDate, 'yyyy-MM-dd', 'en_US');
        v.start = this.ExpiryDate.toString().replace(/T.$/, '');
        v.end = this.ExpiryDate.toString().replace(/T.$/, '');
        this.fullcalendar.getApi().addEvent(v);
        }
        this.fullcalendar.getApi().render();
      }) 
   
  }
  getEventsByMonthAfter() {
    this.month++;
    if (this.month == 12) {
    this.month = 0;
    this.year++;
    }
    const monthString = this.month > 9 ? this.month.toString() : '0' + this.month.toString();
    this.CalendarByMonth.year=this.year;
    this.CalendarByMonth.month=this.month;
    this.documentService.GetDocumentByMonth(this.CalendarByMonth.month)
    .subscribe(
      (response: any) => {
        this.docList = response.result;
        this.fullcalendar.getApi().removeAllEvents();
        this.fullcalendar.getApi().changeView('dayGridMonth', this.year + '-' + monthString + '-01');
        for (var v of response.result) {
          this.ExpiryDate=formatDate(v.ExpiryDate, 'yyyy-MM-dd', 'en_US');
        v.start = this.ExpiryDate.toString().replace(/T.$/, '');
        v.end = this.ExpiryDate.toString().replace(/T.$/, '');
        this.fullcalendar.getApi().addEvent(v);
        }
        this.fullcalendar.getApi().render();
      })
  }

  GetDocumentByMonth(): void {
    this.CalendarByMonth.year=this.year;
    this.CalendarByMonth.month=this.month;
    this.documentService.GetDocumentByMonth(this.CalendarByMonth.month)
    .subscribe(
      (response: any) => {
        this.docList = response.result;
        this.fullcalendar.getApi().removeAllEvents();
        for (var v of response.result) {
          this.ExpiryDate=formatDate(v.ExpiryDate, 'yyyy-MM-dd', 'en_US');
        v.start = this.ExpiryDate.toString().replace(/T.$/, '');
        v.end = this.ExpiryDate.toString().replace(/T.$/, '');
        this.fullcalendar.getApi().addEvent(v);
        }
        this.fullcalendar.getApi().render();
      }) 
    }
}
