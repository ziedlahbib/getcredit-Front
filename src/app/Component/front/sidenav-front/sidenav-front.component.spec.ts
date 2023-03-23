import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavFrontComponent } from './sidenav-front.component';

describe('SidenavFrontComponent', () => {
  let component: SidenavFrontComponent;
  let fixture: ComponentFixture<SidenavFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
