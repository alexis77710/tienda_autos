import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Art2Component } from './art2.component';

describe('Art2Component', () => {
  let component: Art2Component;
  let fixture: ComponentFixture<Art2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Art2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Art2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
