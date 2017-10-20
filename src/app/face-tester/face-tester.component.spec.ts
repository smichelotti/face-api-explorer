import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceTesterComponent } from './face-tester.component';

describe('FaceTesterComponent', () => {
  let component: FaceTesterComponent;
  let fixture: ComponentFixture<FaceTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
