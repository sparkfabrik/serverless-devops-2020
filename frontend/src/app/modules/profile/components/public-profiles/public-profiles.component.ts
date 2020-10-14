import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-profiles',
  templateUrl: './public-profiles.component.html',
  styleUrls: ['./public-profiles.component.scss'],
})
export class PublicProfilesComponent implements OnInit, OnDestroy {
  profiles: object[];
  loading = true;
  private sub: Subscription;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  loadProfiles(): void {
    this.sub = this.profileService
      .listPublicProfiles()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (response: any) => this.profiles = response.data,
        (error) => console.error(error)
      );
  }

}
