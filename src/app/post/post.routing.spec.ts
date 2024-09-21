import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { Routes } from '@angular/router';

describe('PostRoutingModule', () => {
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: 'post', redirectTo: 'post/index', pathMatch: 'full' },
    { path: 'post/index', component: IndexComponent },
    { path: 'post/:postId/view', component: ViewComponent },
    { path: 'post/create', component: CreateComponent },
    { path: 'post/:postId/edit', component: EditComponent }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)], // Use RouterTestingModule with defined routes
      declarations: [IndexComponent, ViewComponent, CreateComponent, EditComponent], // Declare components
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation(); // Trigger initial navigation
  });

  it('should redirect from "post" to "post/index"', async () => {
    await router.navigate(['/post']);
    expect(location.path()).toBe('/post/index');
  });

  it('should navigate to "post/index" and render IndexComponent', async () => {
    await router.navigate(['/post/index']);
    expect(location.path()).toBe('/post/index');
  });

  it('should navigate to "post/:postId/view" and render ViewComponent', async () => {
    await router.navigate(['/post/1/view']);
    expect(location.path()).toBe('/post/1/view');
  });

  it('should navigate to "post/create" and render CreateComponent', async () => {
    await router.navigate(['/post/create']);
    expect(location.path()).toBe('/post/create');
  });

  it('should navigate to "post/:postId/edit" and render EditComponent', async () => {
    await router.navigate(['/post/1/edit']);
    expect(location.path()).toBe('/post/1/edit');
  });
});
