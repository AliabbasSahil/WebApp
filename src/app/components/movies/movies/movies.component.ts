import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { appConfig } from 'src/app/ap.cconfig';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  isDarkTheme = false
  movies : any[] = []
  originalArray : any[] = []
  randomPic! : string
  detailsModal = false
  selected : any
  rowCount!: number;
  page = 1;
  totalRecords = 0

  constructor(
    public sharedService : SharedServiceService,
    public router : Router,
    public messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getData(this.page)
  }

  getData(page:any){
    this.sharedService.getMovieList(page).subscribe((response:any) => {
      if(response.results.length>0){
        this.movies = response.results
        this.movies = this.movies.map((el:any) => ({
          title : el.title,
          description : el.description,
          genres : el.genres,
          uuid:el.uuid,
          imgUrl:`${appConfig.avatar}`+el.title
        } ))
        this.originalArray = this.movies
      }
      this.totalRecords = response.count
    },(error:any) => {     
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error ? error.message : 'Something went wrong' });
    }
    )
  }

    loadMovies(event : any) {
      this.page = (event.first / event.rows) + 1;
      this.getData(this.page)
    }

   viewDetails(data:any){
    this.selected = data
    this.detailsModal = true
   }

   changeTheme(){
    this.isDarkTheme = !this.isDarkTheme
   }

   logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
   }

   ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(250), distinctUntilChanged(), tap(() => {
      if(this.originalArray.length>0 && (this.searchInput.nativeElement.value.length%3===0)){       
       this.movies = this.originalArray.filter((el) => (el.title.toUpperCase().indexOf(this.searchInput.nativeElement.value.toUpperCase())>-1) )
      }
    })).subscribe();
  }

  refreshPage(){
    this.getData(this.page)
  }

}
