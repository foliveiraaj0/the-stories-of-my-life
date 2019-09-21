import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { User } from "src/app/models/user-model";
import { AlbumController } from "./album-controller";
import { Album } from "src/app/models/album-model";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.scss"]
})
export class AlbumComponent implements OnInit {
  constructor(
    private albumController: AlbumController,
    private location: Location
  ) {}

  ngOnInit() {}

  getUserData(): User {
    const data = this.albumController.getUserData();
    return data;
  }

  createAlbumData(): Album {
    return null;
  }

  createAlbum(): void {
    const album: Album = this.createAlbumData();
    this.albumController
      .sendAlbum(album)
      .toPromise()
      .then((album: Album) => {
        this.location.back();
      })
      .catch(error => {});
  }
}
