import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
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
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: { Profile }) => {
        this.profile = data.Profile;
        if (this.profile) {
          this.profileForm.patchValue(this.profile);
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
    this.profileService.updateProfile(this.profile.id, form)
      .pipe(finalize(() => this.saving = false), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
      }, error => console.error(error.message));
  }

  delete(): void {
    this.saving = true;
    this.profileService.deleteProfile(this.profile.id)
      .pipe(finalize(() => this.saving = false), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.router.navigate(['/profiles']);
      }, error => console.error(error.message));
  }

}
