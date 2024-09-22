import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { NotifyGuard } from '../service/guards/notify.guard';

const routes: Routes = [
  { path: 'post/index', component: IndexComponent },
  { path: 'post/:postId/view', component: ViewComponent },
  {
    path: 'post/create',
    component: CreateComponent,
    canDeactivate: [NotifyGuard],
  },
  {
    path: 'post/:postId/edit',
    component: CreateComponent,
    canDeactivate: [NotifyGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
