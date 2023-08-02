import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditrefmanagmentComponent } from './creditrefmanagment.component';

describe('CreditrefmanagmentComponent', () => {
  let component: CreditrefmanagmentComponent;
  let fixture: ComponentFixture<CreditrefmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditrefmanagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditrefmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
