import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app/app.component';
import { appProviders } from './app/app.routes';

describe('AppComponent (Standalone)', () => {
  it('should create the app component', () => {
    TestBed.configureTestingModule({
      providers: appProviders,
      imports: [AppComponent]
    }).compileComponents();

    const component = TestBed.createComponent(AppComponent);
    expect(component).toBeTruthy();
  });
});

