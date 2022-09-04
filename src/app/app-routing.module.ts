import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginPageComponent},
  {
    path: "movies",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./components/movies/movies.module").then(m => m.MoviesModule),
    // canLoad: [AuthCanloadGuard]
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
