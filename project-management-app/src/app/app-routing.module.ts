import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: {
      title: "Tableau de bord",
      description: "Bienvenue sur le tableau de bord du planificateur académique. Obtenez un aperçu de vos activités académiques et gérez vos tâches efficacement."
    }
  },
  {
    path: 'login', component: LoginComponent,
    data: {
      title: "",
      description: "" 
    }
  },
  {
    path: 'user/:username', component: UserComponent,
    data: {
      title: "",
      description: ""
    }
  },
  {
    path: 'users-management', component: UsersManagementComponent,
    data: {
      title: "Gestion des Utilisateurs",
      description: "Gérez efficacement les utilisateurs, y compris les étudiants, le corps professoral et le personnel administratif, avec le module de gestion des utilisateurs du planificateur académique."
    }
  },
];


@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

    [RouterModule.forRoot([], { useHash: false })],
    //RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
