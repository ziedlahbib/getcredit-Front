import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueMagasinComponent } from './statistique-magasin.component';

describe('StatistiqueMagasinComponent', () => {
  let component: StatistiqueMagasinComponent;
  let fixture: ComponentFixture<StatistiqueMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueMagasinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
