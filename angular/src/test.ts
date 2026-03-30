import { TestBed } from '@angular/core/testing';

import { AppModule } from './app/app.module';

describe('AppModule', () => {
  it('should create the app module', () => {
    const module = TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();

    expect(module).toBeTruthy();
  });
});
