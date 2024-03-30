import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificBrandComponent } from './specific-brand.component';

describe('SpecificBrandComponent', () => {
  let component: SpecificBrandComponent;
  let fixture: ComponentFixture<SpecificBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpecificBrandComponent]
    });
    fixture = TestBed.createComponent(SpecificBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
