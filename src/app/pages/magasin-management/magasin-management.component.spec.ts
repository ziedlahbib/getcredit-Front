import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinManagementComponent } from './magasin-management.component';

describe('MagasinManagementComponent', () => {
  let component: MagasinManagementComponent;
  let fixture: ComponentFixture<MagasinManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagasinManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagasinManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
