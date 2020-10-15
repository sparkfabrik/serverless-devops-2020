import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './services/profile/profile.service';
import { ProfileResolver } from './services/profile/profile-resolver.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    ProfilesComponent,
    ProfileComponent,
  ],
  providers: [ProfileService, ProfileResolver],
  exports: [
    ProfilesComponent,
    ProfileComponent,
  ],
})
export class ProfileModule { }
