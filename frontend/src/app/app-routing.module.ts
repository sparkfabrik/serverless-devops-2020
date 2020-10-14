import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicProfilesComponent } from './modules/profile/components/public-profiles/public-profiles.component';
import { PublicProfileComponent } from './modules/profile/components/public-profile/public-profile.component';
import { ProfileResolver } from './modules/profile/services/profile/profile-resolver.service';
import { CreateProfileComponent } from './modules/profile/components/create-profile/create-profile.component';
import { UpdateProfileComponent } from './modules/profile/components/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: 'profiles',
    component: PublicProfilesComponent,
  },
  {
    path: 'profile/:id',
    component: PublicProfileComponent,
    resolve: {
      Profile: ProfileResolver,
    },
  },
  {
    path: 'profile/:id/edit',
    component: UpdateProfileComponent,
    resolve: {
      Profile: ProfileResolver,
    },
  },
  {
    path: 'create',
    component: CreateProfileComponent,
  },
  { path: '', redirectTo: '/profiles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
