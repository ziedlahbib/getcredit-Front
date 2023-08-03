import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueEntrepriseComponent } from './statistique-entreprise.component';

describe('StatistiqueEntrepriseComponent', () => {
  let component: StatistiqueEntrepriseComponent;
  let fixture: ComponentFixture<StatistiqueEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
