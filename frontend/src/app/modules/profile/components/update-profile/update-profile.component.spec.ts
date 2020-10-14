import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { UpdateProfileComponent } from './update-profile.component';
import { ProfileService } from '../../services/profile/profile.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  const fakeActivatedRoute = {
    data: {
      pipe: () => ({
        subscribe: (fn: (value: Data) => void) =>
          fn({ Profile: {} })
      })
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [UpdateProfileComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, ProfileService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
