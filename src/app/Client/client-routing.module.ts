import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentComponent } from './add-document/add-document.component';
import { CalenderComponent } from './calender/calender.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesComponent } from './files/files.component';
import { FoldersComponent } from './folders/folders.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SavedDocumentsComponent } from './saved-documents/saved-documents.component';
import { SettingsComponent } from './settings/settings.component';
import { SharingComponent } from './sharing/sharing.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TaskTodoComponent } from './task-todo/task-todo.component';
import { FolderDocumentsComponent } from './folder-documents/folder-documents.component';

const routes: Routes = [
  
  // basic routes
  { 
    path: '',
    component: ClientLayoutComponent, 
    children: [
      
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calender', component: CalenderComponent },
      { path: 'folders', component: FoldersComponent },
      { path: 'savedDocuments/:statusFilter', component: SavedDocumentsComponent },
      { path: 'FolderDocuments/:folderId', component: FolderDocumentsComponent },
      { path: 'sharing', component: SharingComponent },
      { path: 'files', component: FilesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'addDocument', component: AddDocumentComponent },
      { path: 'TaskTodo', component: TaskTodoComponent },
    ]
  },
      { path: 'login', component: LoginComponent },
      { path: 'Signup', component: SignUpComponent },
      { path: 'ResetPassword/:email/:token', component: ResetPasswordComponent },
      { path: 'forget', component: ForgetPasswordComponent },
      { path: 'ConfirmEmail/:UserId/:token', component: ConfirmEmailComponent },
  // redirect to home
 /*  { path: '**', redirectTo: '' } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
