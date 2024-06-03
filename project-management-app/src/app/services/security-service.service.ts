import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NetworkServiceService } from './network-service.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  private readonly MODULE_GET_URL: string = 'security/';
  private readonly LOCAL_STORAGE_KEY: string = 'securityInfo';

  private loginStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  loginState$: Observable<boolean> = this.loginStateSubject.asObservable();

  user: User = new User();

  constructor(
    private networkService: NetworkServiceService,
    private router: Router,
  ) { }

  login(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.user = new User();
      this.user.username = username;
      this.user.password = password;

      this.networkService.post(this.MODULE_GET_URL + "login", this.user, true).then((response: any) => {
        // Store the security info in LocalStorage
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(response));
        this.loginStateSubject.next(true);
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  logout(username: string, token: string) {
    return new Promise((resolve, reject) => {
      this.user = new User();
      this.user.username = username;
      this.user.token = token;

      this.networkService.post(this.MODULE_GET_URL + "logout", this.user, true).then((response: any) => {
        // Purge the security info from LocalStorage
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        this.loginStateSubject.next(false);
        this.router.navigateByUrl('/login');
        resolve(response);
      }, error => {
        // Purge the security info from LocalStorage
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        this.loginStateSubject.next(false);
        this.router.navigateByUrl('/login');
        reject(error);
      });
    });
  }

  // Method to retrieve security info from LocalStorage
  getSecurityInfo(): User {
    const storedInfo = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    const user = storedInfo ? JSON.parse(storedInfo) : null;
    if (!user) this.router.navigateByUrl('/login');
    return user;
  }

  private isUserLoggedIn(): boolean {
    return !!localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }
}
