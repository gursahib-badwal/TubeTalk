import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { HelpPageComponent } from './components/pages/help-page/help-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MoviePageComponent } from './components/pages/movie-page/movie-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { TvShowPageComponent } from './components/pages/tv-show-page/tv-show-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'search/:searchTerm', component:HomeComponent},
  {path:'tag/:tag', component:HomeComponent},
  {path:'movie/:id',component:MoviePageComponent},
  {path:'tvShow/:id',component:TvShowPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'profile',component:ProfilePageComponent},
  {path:'contact',component:ContactPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
