import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeController } from './home-controller';
import { SketcherModule } from 'src/app/shared/sketcher/sketcher.module';
import { HeaderModule } from 'src/app/shared/header/header.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    SketcherModule
  ],
  providers: [HomeController]
})
export class HomeModule {}
