import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config-model';

@Injectable()
export class UrlHelper {
  private configUrl = "../../assets/config.json";
  constructor(private http: HttpClient) {}

  getConfig(forceUpdate?:boolean) {
    this.http.get<Config>(this.configUrl).subscribe(this.updateUrls);
  }

  private updateUrls(config:Config): void {
    localStorage.setItem("config", JSON.stringify(config));
  }

  postLoginUrl() {
    let loginUrl = "";
    const configString = localStorage.getItem("config");
    if(configString) {
      const config:Config = JSON.parse(configString);
      const baseVersion = `${config.server_base_url}/${config.server_version}`;
      loginUrl = `${baseVersion}/${config.post_login_path}`;
    }
    return loginUrl;
  }

  getUserUrl() {
    let userUrl = "";
    const configString = localStorage.getItem("config");
    if(configString) {
      const config:Config = JSON.parse(configString);
      const baseVersion = `${config.server_base_url}/${config.server_version}`;
      userUrl = `${baseVersion}/${config.get_user_path}`;
    }
    return userUrl;
  }

  postSigninUrl() {
    let signInUrl = "";
    const configString = localStorage.getItem("config");
    if(configString) {
      const config:Config = JSON.parse(configString);
      const baseVersion = `${config.server_base_url}/${config.server_version}`;
      signInUrl = `${baseVersion}/${config.sign_in_path}`;
    }
    return signInUrl;
  }

  postLogoutUrl() {
    let logoutUrl = "";
    const configString = localStorage.getItem("config");
    if(configString) {
      const config:Config = JSON.parse(configString);
      const baseVersion = `${config.server_base_url}/${config.server_version}`;
      logoutUrl = `${baseVersion}/${config.logout_path}`;
    }
    return logoutUrl;
  }

  /* private getArrayFromConfig(arrayName): string {
    
  } */

  getBackgrounds(): string[] {
    let array:string[] = [];
    const configString = localStorage.getItem("config");
    if(configString) {
      const config:Config = JSON.parse(configString);
      array = config['backgrounds'];
    }
    return array;
  }

  getUserNames(): string[] {
    let array:string[] = [];
    const configString = localStorage.getItem("config");
    if(configString) {
      const config:Config = JSON.parse(configString);
      array = config['users'];
    }
    return array;
  }
  

}
