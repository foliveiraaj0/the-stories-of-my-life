import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInController } from './sign-in.controller';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule
  ],
  providers: [SignInController]
})
export class SignInModule {}
