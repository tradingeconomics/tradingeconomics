import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDataTableComponent } from './historical-data-table.component';

describe('HistoricalDataTableComponent', () => {
  let component: HistoricalDataTableComponent;
  let fixture: ComponentFixture<HistoricalDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricalDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
