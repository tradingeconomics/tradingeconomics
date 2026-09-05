import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = [
    { "Country": "Sweden", "Category": "GDP", "DateTime": "2015-12-31T00:00:00", "Value": 505.1, "Frequency": "Yearly", "HistoricalDataSymbol": "WGDPSWED", "LastUpdate": "2020-07-02T14:51:00" },
    { "Country": "Uk", "Category": "Population", "DateTime": "2015-12-31T00:00:00", "Value": 9.7474, "Frequency": "Yearly", "HistoricalDataSymbol": "SWE SP.POP.TOTL", "LastUpdate": "2024-07-15T17:32:00" },
    // Add the rest of your data here
  ];

  getData(): Observable<any[]> {
    return of(this.data);
  }
}
