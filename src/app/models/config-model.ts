export class Config {
  constructor(
    public server_base_url: string,
    public server_version: string,
    public post_login_path: string,
    public get_user_path: string,
    public sign_in_path: string,
    public logout_path: string,
    public templates: [],
    public places: []
  ) {}
}
