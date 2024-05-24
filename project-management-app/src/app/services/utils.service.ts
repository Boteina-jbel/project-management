import { Injectable } from '@angular/core';
import { NetworkServiceService } from './network-service.service';
import { ConfigurationService } from './configuration.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { GlobalConfig } from '../models/GlobalConfig';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SecurityServiceService } from './security-service.service';
import { SecurityDTO } from '../models/msg/SecurityDTO';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private readonly PREFERRED_LANGUAGE_LOCAL_STORAGE_KEY: string = 'preferredLanguage';

  securityDTO     : SecurityDTO;
  global          : GlobalConfig;
  public pages = {
    admin: [
      { code: 'dashboard',  url: '/', icon: 'home' },
      { code: 'university', url: '/university', icon: 'business' },
      { code: 'users',      url: '/users-management', icon: 'people' },
      { code: 'schedules',  url: '/schedules', icon: 'time' },
      { code: 'absences',   url: '/absences', icon: 'calendar' },
    ],
    teacher: [
      { code: 'dashboard',   url: '/dashboard', icon: 'home' },
      { code: 'courses',     url: '/courses', icon: 'book' },
      { code: 'absences',    url: '/absences', icon: 'calendar' },
      { code: 'grades',      url: '/grades', icon: 'school' },
      { code: 'students',    url: '/students', icon: 'people' },
    ],
    student: [
      { code: 'dashboard',   url: '/dashboard', icon: 'home' },
      { code: 'courses',     url: '/courses', icon: 'book' },
      { code: 'absences',    url: '/absences', icon: 'calendar' },
      { code: 'grades',      url: '/grades', icon: 'school' },
    ]
  };

  constructor(
    private networkService        : NetworkServiceService,
    private configuration         : ConfigurationService,
    private clipboard             : Clipboard,
    private modalCtrl             : ModalController,
    private translate             : TranslateService,
    private securityService       : SecurityServiceService,
  ) { }

  imageGet(path: string, toBeLoaded: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      this.networkService.get("blob/image/" + path, toBeLoaded).then((response: any) => {
        resolve(response.strArg1);
      }, error => {
        reject(error);
      });
    });
  }

  imageServeUrlBuild(path: string): string {
    return this.configuration.configuration.serverUrl + path;
  }

  pagesConfigGet() {
    const securityDTO: SecurityDTO = this.securityService.getSecurityInfo();
    const userProfileCode = securityDTO?.profile?.code.toLowerCase();

    switch (userProfileCode) {
      case 'admin':
        return this.pages.admin;
      case 'teacher':
        return this.pages.teacher;
      case 'student':
        return this.pages.student;
      default:
        return this.pages.admin;
    }
  }

  copyToClipBoard(text: string, needApplicationUrl: boolean) {
    if (needApplicationUrl && this.configuration.configuration.applicationUrl) {
      text = this.configuration.configuration.applicationUrl + text;
    }
    console.log(text);
    const done = this.clipboard.copy(text);
    console.log(done);
  }

  applicationUrlGet(): string {
    return this.configuration.configuration.applicationUrl
  }

  globalGet(): GlobalConfig {
    if (this.global) return this.global;

    this.global = new GlobalConfig();
    return this.global;
  }

  switchLanguage(language: string) {
    localStorage.setItem(this.PREFERRED_LANGUAGE_LOCAL_STORAGE_KEY, JSON.stringify(language));
    this.translate.use(language);
  }

  setDefaultLanguage() {
    let language = localStorage.getItem(this.PREFERRED_LANGUAGE_LOCAL_STORAGE_KEY);
    language = language ? JSON.parse(language) : null;
    this.switchLanguage(language ? language : this.configuration.configuration.defaultLanguage);
  }

  getDefaultLanguage() {
    let language = localStorage.getItem(this.PREFERRED_LANGUAGE_LOCAL_STORAGE_KEY);
    language = language ? JSON.parse(language) : null;
    return language ? language : this.configuration.configuration.defaultLanguage;
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

}
