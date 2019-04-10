export class User {
  constructor(
    public id: number,
    public name: string,
    public birthDate?: string,
    public email?: string
  ) {}
}
