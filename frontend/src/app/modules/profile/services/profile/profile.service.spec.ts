import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'environments/environment';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientService],
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.inject(HttpTestingController);
    environment.api.clients = 'http://example.com/client';
    environment.api.members = 'http://example.com/members';
  });

  it('should be created', inject([ClientService], (service: ClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Client profile', inject([ClientService], (service: ClientService) => {
    const response = <Lseg.DTO.Client.ClientProfile.Response>{
      id: '1',
      name: '',
    };
    service.getNlcProfile().subscribe(() => {});
    const req = httpMock.expectOne('http://example.com/client/profile/view');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  }));

  it('should save Client profile', inject([ClientService], (service: ClientService) => {
    const profile = <Lseg.Models.Client>{
      id: '1',
      name: '',
    };
    service.saveNlcProfile(profile).subscribe(() => {});
    const req = httpMock.expectOne('http://example.com/client/profile/update');
    expect(req.request.method).toBe('POST');
    req.flush(profile);
  }));
});
