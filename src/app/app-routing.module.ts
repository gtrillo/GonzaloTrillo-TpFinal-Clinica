import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';
import { LoginComponent } from './modulos/login/login.component';
import { RegistroComponent } from './modulos/registro/registro.component';
import { AdminstacionUsuariosComponent } from './modulos/adminstacion-usuarios/adminstacion-usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "administracion", component: AdminstacionUsuariosComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./modulos/home.module').then(
        (m) => m.HomeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
