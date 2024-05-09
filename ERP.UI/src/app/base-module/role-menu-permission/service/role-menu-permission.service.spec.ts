import { TestBed } from '@angular/core/testing';

import { RoleMenuPermissionService } from './role-menu-permission.service';

describe('RoleMenuPermissionService', () => {
  let service: RoleMenuPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleMenuPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
