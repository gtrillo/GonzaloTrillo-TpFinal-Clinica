import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';
import { LoginComponent } from './modulos/login/login.component';
import { RegistroComponent } from './modulos/registro/registro.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
