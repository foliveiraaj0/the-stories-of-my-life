import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInController } from './sign-in.controller';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderModule,
    ReactiveFormsModule,
    SignInRoutingModule
  ],
  providers: [SignInController]
})
export class SignInModule {}
