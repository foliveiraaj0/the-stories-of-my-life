export class User {
  constructor(
    public name: string,
    public birthDate: string,
    public email: string,
    public token?: string
  ) {}
}
