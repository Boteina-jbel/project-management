import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { UtilsService } from './services/utils.service';
import { GlobalConfig } from './models/GlobalConfig';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { MetaService } from './services/meta.service';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { SecurityServiceService } from './services/security-service.service';
import { SecurityDTO } from './models/msg/SecurityDTO';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  pages           : any[];
  global          : GlobalConfig;
  securityDTO     : SecurityDTO;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService,
    public utilsService: UtilsService,
    private securityService: SecurityServiceService,
  ) { }

  async ngOnInit() {
    this.utilsService.setDefaultLanguage();
    this.pages = this.utilsService.pagesConfigGet();
    this.global = this.utilsService.globalGet();

    // this.securityDTO = this.securityService.getSecurityInfo();
    // if (! this.securityDTO) {
    //   this.router.navigateByUrl('/login');
    // }

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
        tap(({ title, description }: Data) => {
          this.metaService.setTitle(title);
          this.metaService.setDescription(description);
        })
      ).subscribe();
  }

}
