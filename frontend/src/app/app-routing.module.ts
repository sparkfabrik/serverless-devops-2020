import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicProfilesComponent } from './modules/profile/components/public-profiles/public-profiles.component';
import { PublicProfileComponent } from './modules/profile/components/public-profile/public-profile.component';
import { ProfileResolver } from './modules/profile/services/profile/profile-resolver.service';

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
  { path: '', redirectTo: '/profiles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
