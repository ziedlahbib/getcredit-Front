import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemagasinComponent } from './updatemagasin.component';

describe('UpdatemagasinComponent', () => {
  let component: UpdatemagasinComponent;
  let fixture: ComponentFixture<UpdatemagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatemagasinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatemagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
