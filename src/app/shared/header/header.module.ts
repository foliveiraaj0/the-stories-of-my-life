import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header.component';
import { LogoModule } from "../logo/logo.module";
import { UserMenuModule } from '../user-menu/user-menu.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, LogoModule, UserMenuModule],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
