
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<object> {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<object> {
    return this.profileService.getPublicProfile(route.paramMap.get('id')).pipe(
      map(item => item),
      catchError(err => {
        this.router.navigate(['404']);
        console.error(err);
        throw err;
      })
    );
  }
}
