import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileService } from './services/profile/profile.service';
import { ProfileResolver } from './services/profile/profile-resolver.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  declarations: [
    ProfilesComponent,
    ProfileComponent,
    CreateProfileComponent,
    UpdateProfileComponent,
  ],
  providers: [ProfileService, ProfileResolver],
  exports: [
    ProfilesComponent,
    ProfileComponent,
    CreateProfileComponent,
    UpdateProfileComponent,
  ],
})
export class ProfileModule { }
