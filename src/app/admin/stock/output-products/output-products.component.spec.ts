import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputProductsComponent } from './output-products.component';

describe('OutputProductsComponent', () => {
  let component: OutputProductsComponent;
  let fixture: ComponentFixture<OutputProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
