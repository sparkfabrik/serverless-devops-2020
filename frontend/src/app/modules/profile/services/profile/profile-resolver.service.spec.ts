import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile-resolver.service';

describe('ProfileResolver', () => {
  const route = jasmine.createSpyObj('Route', ['']);
  let profileService: ProfileService;
  let service: ProfileResolver;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ProfileResolver, ProfileService],
    });
    service = TestBed.inject(ProfileResolver);
    profileService = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
