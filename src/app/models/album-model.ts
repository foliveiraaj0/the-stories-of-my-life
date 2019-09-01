export class Album {
  constructor(
    public id: number,
    public name: string,
    public pages: AlbumPage[],
    public coverUrl: string
  ) {}
}

export class AlbumPage {
  constructor(
    public id:number,
    public pageNumber: number,
    public backgroundUrl: string,
    public photoUrl: string[],
    public phont: string 
  ){}
}