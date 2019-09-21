import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeController } from './home-controller';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { BannerModule } from 'src/app/shared/banner/banner.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    BannerModule
  ],
  providers: [HomeController]
})
export class HomeModule {}
