import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MatCardModule } from '@angular/material/card';
import {PaginatorModule} from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatCardModule,
    PaginatorModule,
    DialogModule
  ]
})
export class MoviesModule { }
