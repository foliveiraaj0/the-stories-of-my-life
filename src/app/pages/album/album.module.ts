import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SketcherModule } from 'src/app/shared/sketcher/sketcher.module';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { AlbumComponent } from './album.component';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumController } from './album-controller';

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    HeaderModule,
    SketcherModule
  ],
  providers: [AlbumController]
})
export class AlbumModule {}
