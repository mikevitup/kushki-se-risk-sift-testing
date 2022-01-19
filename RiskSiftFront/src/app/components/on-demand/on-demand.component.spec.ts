import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandComponent } from './on-demand.component';

describe('OnDemandComponent', () => {
  let component: OnDemandComponent;
  let fixture: ComponentFixture<OnDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnDemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
