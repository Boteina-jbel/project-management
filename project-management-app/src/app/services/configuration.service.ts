import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/assets/config/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configuration : Configuration;

  constructor(private httpClient: HttpClient) {}

  public load(configPath: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get(configPath)
        .subscribe(config => {
          this.configuration =  Object.assign(new Configuration(), config);
          resolve(null);
        });
    })
  }

}
