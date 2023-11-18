import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstacionUsuariosComponent } from './adminstacion-usuarios.component';

describe('AdminstacionUsuariosComponent', () => {
  let component: AdminstacionUsuariosComponent;
  let fixture: ComponentFixture<AdminstacionUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminstacionUsuariosComponent]
    });
    fixture = TestBed.createComponent(AdminstacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
