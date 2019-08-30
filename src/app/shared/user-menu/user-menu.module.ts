import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserMenuComponent } from './user-menu.component';
import { MatMenuModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule],
  exports: [UserMenuComponent]
})
export class UserMenuModule {}
