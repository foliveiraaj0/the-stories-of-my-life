import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config-model';

@Injectable()
export class UrlHelper {
  private configUrl = "../../assets/config.json";
/*   post_login_url:string;
  get_user_url:string; */
  constructor(private http: HttpClient) {}

  getConfig(forceUpdate?:boolean) {
    this.http.get<Config>(this.configUrl).subscribe(this.updateUrls);
  }

  private updateUrls(config:Config): void {
    localStorage.setItem("config", JSON.stringify(config));
    /* const baseVersion = `${config.server_base_url}/${config.server_version}`;
    this.post_login_url = `${baseVersion}/${config.post_login_path}`;
    console.log(this.post_login_url);
    this.get_user_url = `${baseVersion}/${config.post_login_path}/${config.get_user_path}`; */
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

}
