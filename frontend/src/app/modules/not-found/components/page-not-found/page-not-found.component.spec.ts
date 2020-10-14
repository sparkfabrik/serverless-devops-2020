import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../../environments/environment';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: '404', component: PageNotFoundComponent }]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('showGoToHome should be equal to false', () => {
    component.showGoToHomeButton();
    expect(component.showGoToHome).toBe(false);
    expect(component.goToHomeLink).toEqual('/');
  });

  it('showGoToHome should be equal to true', () => {
    sessionStorage.setItem(environment.homePageKey, 'LondonStockExchange');
    component.showGoToHomeButton();
    expect(component.showGoToHome).toBe(true);
    expect(component.goToHomeLink).toEqual('/LondonStockExchange');
  });
});
