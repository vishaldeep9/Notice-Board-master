import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './post/create/create.component';

const routes: Routes = [
  {path:'create',component:CreateComponent},
  { path: 'post', redirectTo: 'post/index', pathMatch: 'full'},
   {
    path:'post',
    loadChildren:()=>import('./post/post.module').then(p=>p.PostModule)
   },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
