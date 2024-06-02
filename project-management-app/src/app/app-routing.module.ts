import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ProjectsComponent } from './projects/projects.component';
import { FeatureTasksComponent } from './feature-tasks/feature-tasks.component';
import { BugTasksComponent } from './bug-tasks/bug-tasks.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: {
      title: "dashboard",
    }
  },
  {
    path: 'login', component: LoginComponent,
    data: {
      title: "login",
    }
  },
  {
    path: 'user/:username', component: UserComponent,
    data: {
      title: "user",
    }
  },
  {
    path: 'users', component: UsersManagementComponent,
    data: {
      title: "users",
    }
  },
  {
    path: 'projects', component: ProjectsComponent,
    data: {
      title: "projects",
    }
  },
  {
    path: 'feature-tasks', component: FeatureTasksComponent,
    data: {
      title: "feature-tasks",
    }
  },
  {
    path: 'bug-tasks', component: BugTasksComponent,
    data: {
      title: "bug-tasks",
    }
  }
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
