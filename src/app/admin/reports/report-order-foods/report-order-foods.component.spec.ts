import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderFoodsComponent } from './report-order-foods.component';

describe('ReportOrderFoodsComponent', () => {
  let component: ReportOrderFoodsComponent;
  let fixture: ComponentFixture<ReportOrderFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOrderFoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
