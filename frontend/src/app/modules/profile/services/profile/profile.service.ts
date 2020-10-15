import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) { }

  listPublicProfiles(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/profile/list`);
  }

  getPublicProfile(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/profile/${id}`);
  }

  createProfile(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/profile`, body);
  }

  updateProfile(id: string, body: object): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/profile/${id}`, body);
  }

  deleteProfile(id: string): Observable<void> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/profile/${id}`);
  }

  getSignedUrl(fileName: string): Promise<object> {
    return this.http.get(`${environment.apiBaseUrl}/get-signed-url?key=${fileName}`).toPromise();
  }

  uploadFile(fileSignedUrl, file): Observable<any> {
    return this.http.put(fileSignedUrl, file);
  }

}
