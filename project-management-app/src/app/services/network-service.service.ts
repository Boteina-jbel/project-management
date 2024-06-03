import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  constructor(
    private configuration: ConfigurationService,
    private http: HttpClient,
    private spinner: SpinnerService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  private getAuthToken(): string | null {
    const storedInfo = localStorage.getItem('securityInfo');
    const securityDTO = storedInfo ? JSON.parse(storedInfo) : null;
    if(! securityDTO) return null;
    return 'Bearer ' + securityDTO.token;
  }

  private getUsername(): string | null {
    const storedInfo = localStorage.getItem('securityInfo');
    const securityDTO = storedInfo ? JSON.parse(storedInfo) : null;
    if(! securityDTO) return null;
    return securityDTO.username;
  }

  private createHttpOptions() {
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getAuthToken();
    const username = this.getUsername();

    if (token) httpHeaders = httpHeaders.set('Authorization', token);
    if (username) httpHeaders = httpHeaders.set('username', username);

    return httpHeaders;
  }

  public post(module: string, query: any, toBeLoaded: boolean): Promise<any> {
    if (toBeLoaded) this.spinner.show();
    const endPointUrL = this.configuration.configuration.serverUrl + module;

    let httpOptions = {
      headers: this.createHttpOptions(),
      params: undefined,
      reportProgress: false,
      withCredentials: false
    }

    return new Promise((resolve, reject) => {
      this.http.post(endPointUrL, query, httpOptions).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          resolve(response);
        },
        error: (error) => {
          if (toBeLoaded) this.spinner.hide();
          if(error.error && error.error.errorCode === 'unauthorized') this.router.navigateByUrl('/login');
          else this.presentAlert('Oops!', error.error.errorCode && error.error.errorMessage ? error.error.errorCode + ' : ' + error.error.errorMessage : 'Something went wrong. Please try again');
          reject(error);
        }
      });
    });
  }

  public get(module: string, toBeLoaded: boolean): Promise<any> {
    if (toBeLoaded) this.spinner.show();
    const endPointUrL = this.configuration.configuration.serverUrl + module;

    let httpOptions = {
      headers: this.createHttpOptions(),
      params: undefined,
      reportProgress: false,
      withCredentials: false
    }

    return new Promise((resolve, reject) => {
      this.http.get(endPointUrL, httpOptions).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          resolve(response);
        },
        error: (error) => {
          if (toBeLoaded) this.spinner.hide();
          if ((error.error && error.error.errorCode === 'unauthorized')) {
            this.router.navigateByUrl('/login');
          } else {
            this.presentAlert('Oops!', error.error.errorCode && error.error.errorMessage ? error.error.errorCode + ' : ' + error.error.errorMessage : 'Something went wrong. Please try again');
          }
          reject(error);
        }
      });
    });
  }

  public delete(module: string, toBeLoaded: boolean): Promise<any> {
    if (toBeLoaded) this.spinner.show();
    const endPointUrL = this.configuration.configuration.serverUrl + module;

    let httpOptions = {
      headers: this.createHttpOptions(),
      params: undefined,
      reportProgress: false,
      withCredentials: false
    }

    return new Promise((resolve, reject) => {
      this.http.delete(endPointUrL, httpOptions).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          resolve(response);
        },
        error: (error) => {
          if (toBeLoaded) this.spinner.hide();
          if(error.error && error.error.errorCode === 'unauthorized') this.router.navigateByUrl('/login');
          else this.presentAlert('Oops!', error.error.errorCode && error.error.errorMessage ? error.error.errorCode + ' : ' + error.error.errorMessage : 'Something went wrong. Please try again');
          reject(error);
        }
      }); 
    });
  }

  private async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  loadedImages: Set<string> = new Set();

  isImageLoaded(image: string): boolean {
    return this.loadedImages.has(image);
  }

  imageLoaded(event: any) {
    // This event is triggered when an image is loaded
    // Add the loaded image to the set
    this.loadedImages.add(event.target['src']);
  }
}


export enum ServerCode {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  INPROGRESS = 'InProgress',
  ERROR = 'Error',
}