import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenChargeComponent } from './token-charge.component';

describe('TokenChargeComponent', () => {
  let component: TokenChargeComponent;
  let fixture: ComponentFixture<TokenChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
