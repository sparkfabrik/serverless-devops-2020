import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, NotFoundRoutingModule],
  declarations: [PageNotFoundComponent],
  providers: [],
  exports: [PageNotFoundComponent]
})
export class NotFoundModule { }
