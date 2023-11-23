import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'gestion-turnos',
    loadChildren: () =>
      import('./gestion-turnos/gestion-turnos.component').then(
        (m) => m.GestionTurnosComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
