import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGroupsComponent } from './person-groups.component';

describe('PersonGroupsComponent', () => {
  let component: PersonGroupsComponent;
  let fixture: ComponentFixture<PersonGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
