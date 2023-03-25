import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseManagementComponent } from './entreprise-management.component';

describe('EntrepriseManagementComponent', () => {
  let component: EntrepriseManagementComponent;
  let fixture: ComponentFixture<EntrepriseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepriseManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepriseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
