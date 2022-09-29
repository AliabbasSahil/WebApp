import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MatCardModule } from '@angular/material/card';
import {PaginatorModule} from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import {  TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { AppSvgIconDirectiveDirective } from './../../directives/app-svg-icon-directive.directive';

@NgModule({
  declarations: [
    MoviesComponent,
    AppSvgIconDirectiveDirective
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatCardModule,
    PaginatorModule,
    DialogModule,
    TableModule,
    ChartModule,
  ],
  exports: [
    AppSvgIconDirectiveDirective
  ]

})
export class MoviesModule { }
