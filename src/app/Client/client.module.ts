import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoldersComponent } from './folders/folders.component';
import { SavedDocumentsComponent } from './saved-documents/saved-documents.component';
import { SharingComponent } from './sharing/sharing.component';
import { FilesComponent } from './files/files.component';
import { CalenderComponent } from './calender/calender.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { TaskTodoComponent } from './task-todo/task-todo.component';
import { FolderDocumentsComponent } from './folder-documents/folder-documents.component'; 
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    ClientComponent,
    ClientLayoutComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    FoldersComponent,
    SavedDocumentsComponent,
    SharingComponent,
    FilesComponent,
    CalenderComponent,
    SettingsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    AddDocumentComponent,
    ConfirmEmailComponent,
    TaskTodoComponent,
    FolderDocumentsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
})
export class ClientModule { 
  constructor()
  {
    console.log('Client is loading');
  }
 }
