import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile-resolver.service';
import { of, throwError } from 'rxjs';

describe('ProfileResolver', () => {
  const route = jasmine.createSpyObj('Route', ['']);
  let profileService: ProfileService;
  let service: ProfileResolver;
  let router: Router;
  const item = {
    id: '9b1a0b0c-6ae7-4fce-83d1-7466b468fc1a',
    firstName: 'John',
    lastName: 'Smith'
  };
  const error = {
    message: 'Error from the server',
  };

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

  it('should navigate to 404 if profile not exists', () => {
    const spy = spyOn(profileService, 'getPublicProfile').and.returnValue(throwError(error));
    const routerSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    route.paramMap = {
      get: () => '9b1a0b0c-6ae7-4fce-83d1-7466b468fc1a',
    };
    service.resolve(route).subscribe(
      (res) => {},
      (err) => {
        expect(routerSpy).toHaveBeenCalledWith(['404']);
      }
    );
    expect(spy).toHaveBeenCalledWith('9b1a0b0c-6ae7-4fce-83d1-7466b468fc1a');
  });

  it('should resolve with a profile', () => {
    const spy = spyOn(profileService, 'getPublicProfile').and.returnValue(of(item));
    const routerSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    route.paramMap = {
      get: () => '9b1a0b0c-6ae7-4fce-83d1-7466b468fc1a',
    };
    service.resolve(route).subscribe((res) => {
      expect(routerSpy).not.toHaveBeenCalledWith(['404']);
      expect(res).toEqual(item);
    });
    expect(spy).toHaveBeenCalledWith('9b1a0b0c-6ae7-4fce-83d1-7466b468fc1a');
  });

});
