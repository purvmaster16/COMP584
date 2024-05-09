import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuPermissionComponent } from './role-menu-permission.component';

describe('RoleMenuPermissionComponent', () => {
  let component: RoleMenuPermissionComponent;
  let fixture: ComponentFixture<RoleMenuPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenuPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMenuPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
