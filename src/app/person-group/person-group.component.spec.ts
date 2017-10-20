import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGroupComponent } from './person-group.component';

describe('PersonGroupComponent', () => {
  let component: PersonGroupComponent;
  let fixture: ComponentFixture<PersonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
