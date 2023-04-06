import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitManagementComponent } from './produit-management.component';

describe('ProduitManagementComponent', () => {
  let component: ProduitManagementComponent;
  let fixture: ComponentFixture<ProduitManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
