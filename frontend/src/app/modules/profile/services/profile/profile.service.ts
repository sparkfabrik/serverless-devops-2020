import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  listPublicProfiles(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/dev/profile/list`);
  }

  getPublicProfile(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/dev/profile/${id}`);
  }

}
