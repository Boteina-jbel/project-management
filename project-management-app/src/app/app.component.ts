import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { UtilsService } from './services/utils.service';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { MetaService } from './services/meta.service';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { SecurityServiceService } from './services/security-service.service';
import { GlobalConfig } from './models/GlobalConfig';
import { User } from './models/User';
import { TranslateService } from '@ngx-translate/core';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  pages           : any[];
  global          : GlobalConfig;
  user            : User;
  currentYear: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService,
    public utilsService: UtilsService,
    public securityService: SecurityServiceService,
    private translate       : TranslateService,

  ) { }

  async ngOnInit() {
    this.utilsService.setDefaultLanguage();
    this.pages = this.utilsService.pagesConfigGet();
    this.global = this.utilsService.globalGet();

    this.user = this.securityService.getSecurityInfo();
    if (! this.user) {
      this.router.navigateByUrl('/login');
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        tap(({ title }: Data) => {
          this.translate.get( 'menu.'+ title).subscribe((translatedTitle: string) => {
            this.metaService.setTitle(translatedTitle);
        });
        })
      ).subscribe();
  }
  
  async logoutAction() {
    await this.securityService.logout(this.user.username, this.user.token);
  }

}
