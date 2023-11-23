import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminstacionUsuariosComponent } from './adminstacion-usuarios/adminstacion-usuarios.component';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    RouterLink
    
  ],

})
export class HomeModule { }
