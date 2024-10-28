import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprovedComponent } from './view-approved.component';

describe('ViewApprovedComponent', () => {
  let component: ViewApprovedComponent;
  let fixture: ComponentFixture<ViewApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApprovedComponent]
    });
    fixture = TestBed.createComponent(ViewApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
