import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-public-profiles',
  templateUrl: './public-profiles.component.html',
  styleUrls: ['./public-profiles.component.scss'],
})
export class PublicProfilesComponent implements OnInit, OnDestroy {
  profiles: object[];
  loading = true;
  private ngUnsubscribe = new Subject();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadProfiles(): void {
    this.profileService
      .listPublicProfiles()
      .pipe(
        finalize(() => (this.loading = false)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: any) => {
          this.profiles = response.data;
          console.log(this.profiles)
        },
        (error) => console.error(error)
      );
  }

}
