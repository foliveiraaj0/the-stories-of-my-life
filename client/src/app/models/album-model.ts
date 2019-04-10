export class Album {
  constructor(
    public id: number,
    public name: string,
    public category?: string,
    background?: string,
    font?: string
  ) {}
}
