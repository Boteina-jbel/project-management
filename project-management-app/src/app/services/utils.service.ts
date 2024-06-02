import { Injectable } from '@angular/core';
import { NetworkServiceService } from './network-service.service';
import { ConfigurationService } from './configuration.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SecurityServiceService } from './security-service.service';
import { User } from '../models/User';
import { GlobalConfig } from '../models/GlobalConfig';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private readonly PREFERRED_LANGUAGE_LOCAL_STORAGE_KEY: string = 'preferredLanguage';

  user            : User;
  global          : GlobalConfig;
  public pages = {
    admin: [
      { code: 'dashboard',  url: '/', icon: 'home' },
      { code: 'projects', url: '/projects', icon: 'folder' },
      { code: 'feature-tasks', url: '/feature-tasks', icon: 'trending-up' },
      { code: 'bug-tasks', url: '/bug-tasks', icon: 'bug' },
      { code: 'users', url: '/users', icon: 'people' }
    ],
    projectManager: [
      { code: 'dashboard',  url: '/', icon: 'home' },
      { code: 'projects', url: '/projects', icon: 'folder' },
      { code: 'feature-tasks', url: '/feature-tasks', icon: 'trending-up' },
      { code: 'bug-tasks', url: '/bug-tasks', icon: 'bug' }
    ],
    teamMember: [
      { code: 'dashboard',  url: '/', icon: 'home' },
      { code: 'projects', url: '/projects', icon: 'folder' },
      { code: 'feature-tasks', url: '/feature-tasks', icon: 'trending-up' },
      { code: 'bug-tasks', url: '/bug-tasks', icon: 'bug' }    
    ],
    stackholder: [
      { code: 'dashboard',  url: '/', icon: 'home' },
      { code: 'projects', url: '/projects', icon: 'folder' },
      { code: 'feature-tasks', url: '/feature-tasks', icon: 'trending-up' },
      { code: 'bug-tasks', url: '/bug-tasks', icon: 'bug' }   
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
    const user: User = this.securityService.getSecurityInfo();
    const userProfileCode = user?.profile?.code.toLowerCase();

    switch (userProfileCode) {
      case 'admin':
        return this.pages.admin;
      case 'pm':
        return this.pages.projectManager;
      case 'tm':
        return this.pages.teamMember;
      case 'sh':
        return this.pages.stackholder;
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
