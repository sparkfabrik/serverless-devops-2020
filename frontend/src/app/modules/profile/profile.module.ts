import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PublicProfilesComponent } from './components/public-profiles/public-profiles.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
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
    PublicProfilesComponent,
    PublicProfileComponent,
  ],
  providers: [ProfileService, ProfileResolver],
  exports: [
    PublicProfilesComponent,
    PublicProfileComponent,
  ],
})
export class ProfileModule { }
