import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminstacionUsuariosComponent } from './adminstacion-usuarios/adminstacion-usuarios.component';
import { GestionTurnosComponent } from './gestion-turnos/gestion-turnos.component';



@NgModule({
  declarations: [
  
  
    GestionTurnosComponent
  ],
  imports: [
    CommonModule,
    RouterLink
    
  ],

})
export class HomeModule { }
