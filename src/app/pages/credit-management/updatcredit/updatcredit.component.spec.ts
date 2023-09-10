import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatcreditComponent } from './updatcredit.component';

describe('UpdatcreditComponent', () => {
  let component: UpdatcreditComponent;
  let fixture: ComponentFixture<UpdatcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatcreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
