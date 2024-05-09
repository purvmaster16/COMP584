import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserSidebarComponent } from './new-user-sidebar.component';

describe('NewUserSidebarComponent', () => {
  let component: NewUserSidebarComponent;
  let fixture: ComponentFixture<NewUserSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
