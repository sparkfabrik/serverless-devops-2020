import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  profile;
  saving = false;
  profileForm: FormGroup;
  private routeSub: Subscription;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.buildForm();
    this.routeSub = this.route.data.subscribe((data: { Profile }) => {
      this.profile = data.Profile;
      this.profileForm.patchValue(this.profile);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  buildForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      bio: [''],
      role: [''],
      country: [''],
    });
  }

  update(): void {
    this.saving = true;
    const form = this.profileForm.value;
    this.sub = this.profileService.updateProfile(this.profile.id, form)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
      }, error => {
        console.error(error.message);
      });
  }

}
