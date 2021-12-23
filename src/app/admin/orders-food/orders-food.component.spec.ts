import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFoodComponent } from './orders-food.component';

describe('OrdersFoodComponent', () => {
  let component: OrdersFoodComponent;
  let fixture: ComponentFixture<OrdersFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
