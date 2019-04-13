import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { MainDashComponent } from './main-dash/main-dash.component';



const routes: Routes = [
  {
    path: 'about',
    component: MainPageComponent,
    data: { title: 'About' }
  },
  {
    path: 'main',
    component: MainDashComponent,
    data: { title: 'Main dashboard' }
  },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
