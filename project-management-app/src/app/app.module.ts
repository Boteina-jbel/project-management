import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './base/base.component';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from './services/configuration.service';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PortalModule } from '@angular/cdk/portal';
import { SkeletonItemComponent } from './components/skeleton-item/skeleton-item.component';
import { SkeletonImageComponent } from './components/skeleton-image/skeleton-image.component';
import { ClipboardDirective } from './directives/clipboard.directive';
import { UsersManagementComponent } from './users-management/users-management.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { UserPopoverComponent } from './base/user-popover/user-popover.component';
import { LoginComponent } from './login/login.component';
import { CustomDatePipe } from './pipes/custom-date-pipe.pipe';
import { UserComponent } from './user/user.component';
import { ProjectsComponent } from './projects/projects.component';
import { FeatureTasksComponent } from './feature-tasks/feature-tasks.component';
import { BugTasksComponent } from './bug-tasks/bug-tasks.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { FeaturetaskModalComponent } from './components/featuretask-modal/featuretask-modal.component';
import { TaskPopoverComponent } from './components/task-popover/task-popover.component';
import { BugTaskModalComponent } from './components/bug-task-modal/bug-task-modal.component';
import { TaskComponent } from './task/task.component';

export function ConfigLoader(configurationService: ConfigurationService) {
  return () => configurationService.load(environment.configFile);
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    SpinnerComponent,
    SkeletonItemComponent,
    SkeletonImageComponent,
    ClipboardDirective,
    HomeComponent,
    UsersManagementComponent,
    ProfilePictureComponent,
    UserPopoverComponent,
    LoginComponent,
    CustomDatePipe,
    UserComponent,
    ProjectsComponent,
    FeatureTasksComponent,
    BugTasksComponent,
    ProjectModalComponent,
    FeaturetaskModalComponent,
    TaskPopoverComponent,
    BugTaskModalComponent,
    FeaturetaskModalComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      mode: 'md',
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    PortalModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
  ],
  providers: [
    ClipboardDirective,
    ConfigurationService,
    {
    provide: APP_INITIALIZER,
    useFactory: ConfigLoader,
    deps: [ConfigurationService],
    multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule {}
