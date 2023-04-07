import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMagasinComponent } from './add-magasin.component';

describe('AddMagasinComponent', () => {
  let component: AddMagasinComponent;
  let fixture: ComponentFixture<AddMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMagasinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
