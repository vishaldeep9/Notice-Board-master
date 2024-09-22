import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelcasePipe } from './service/pipe/camelcase.pipe';


@NgModule({
  declarations: [CamelcasePipe], // Declare your pipe here
  imports: [CommonModule],
  exports: [CamelcasePipe] // Export the pipe so it can be used in other modules
})
export class SharedModule {}