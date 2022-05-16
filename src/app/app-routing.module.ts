import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Client/login/login.component';
import { SettingsComponent } from './Client/settings/settings.component';
import { AuthGuard } from './Core/AuthGuard/auth.guard';
import { CustomPreloadingService } from './Core/Services/custom-preloading.service';



const routes: Routes = [ 
  
   { path: '', component: LoginComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./Admin/admin.module').then((m) => m.AdminModule),
  },
  { 
    path: 'client',
   // data:{preload :true},
    loadChildren: () => import('./Client/client.module').then((m) => m.ClientModule),
    //canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:CustomPreloadingService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
