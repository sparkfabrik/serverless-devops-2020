import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit, OnDestroy {
  profile;
  saving = false;
  profileForm: FormGroup;
  private sub: Subscription;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
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

  save(): void {
    this.saving = true;
    const form = this.profileForm.value;
    this.saving = true;
    this.sub = this.profileService.createProfile(form)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
      }, error => {
        console.error(error.message);
      });
  }

}
