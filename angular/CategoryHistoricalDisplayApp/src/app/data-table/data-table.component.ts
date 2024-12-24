import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';


import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  countryFilter = new FormControl('');
  categoryFilter = new FormControl('');
  
  // Updated dateRange as FormGroup
  dateRange = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  displayedColumns: string[] = [
    'Country',
    'Category',
    'DateTime',
    'Value',
    'Frequency',
    'HistoricalDataSymbol',
    'LastUpdate',
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Fetch initial data
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      this.filteredData = data; // Start with all data
    });

    // Listen for changes in filters
    this.countryFilter.valueChanges.subscribe(() => this.applyFilters());
    this.categoryFilter.valueChanges.subscribe(() => this.applyFilters());
    this.dateRange.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    const country = this.countryFilter.value?.toLowerCase();
    const category = this.categoryFilter.value?.toLowerCase();
    const { start, end } = this.dateRange.value || {};

    this.filteredData = this.data.filter((item) => {
      const itemDate = new Date(item.DateTime);
      return (
        (!country || item.Country.toLowerCase().includes(country)) &&
        (!category || item.Category.toLowerCase().includes(category)) &&
        (!start || itemDate >= new Date(start)) &&
        (!end || itemDate <= new Date(end))
      );
    });
  }
}
