import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    // AppComponent,
    // DataTableComponent
  ],
  imports: [
  ],
  providers: [DataService],
  bootstrap: []
})
export class AppModule { }
