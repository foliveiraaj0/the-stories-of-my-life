import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeController } from './home-controller';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [HomeController]
})
export class HomeModule {}
