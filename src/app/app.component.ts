import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SharedServiceService } from './shared/shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'DempApplication';
  showLoader = false
  isDarkTheme = false
  loaderSubscription = new Subscription()

  constructor(
    public sharedService: SharedServiceService
    
  ) {

  }

  ngOnInit() {
    
    this.loaderSubscription = this.sharedService.loaderState$.subscribe((state: any) => {
      this.showLoader = state;
    });
    


  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

}
