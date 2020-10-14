import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit, OnDestroy {
  profile;
  saving = false;
  profileForm: FormGroup;
  private ngUnsubscribe = new Subject<void>();
  file: File;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.buildForm();
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

  save(): void {
    this.saving = true;
    const form = this.profileForm.value;
    this.saving = true;
    this.profileService.createProfile(form)
      .pipe(finalize(() => this.saving = false), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
      }, error => {
        console.error(error.message);
      });
  }

  fileLoad(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.file = file;
  }

  async uploadFile(): Promise<void> {
    this.saving = true;
    const fileuploadurl = await this.profileService.getSignedUrl(this.file.name);
    this.profileService.uploadFile(fileuploadurl, this.file)
      .pipe(finalize(() => this.saving = false), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {});
  }

}
