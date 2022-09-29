import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
  daily = true;
  month = false;
  pending = false;
  data: any;
  data2: any;
  chartOptions: any;
  chartOptions2: any;

  products: any[] = [{ task: 'Task 1', name: 'Ravi', status: 'Completed' }, { task: 'Task 2', name: 'Adil', status: 'In Progress' }, { task: 'Task 3', name: 'Vivek', status: 'Pending' }, { task: 'Task 4', name: 'Roy', status: 'Completed' }, { task: 'Task 5', name: 'Amit', status: 'In Progress' }];
  pendingTasks: any[] = [{ task: 'Task 6', name: 'Teja', status: '20 Sep 2022' }, { task: 'Task 7', name: 'Aviram', status: '21 Sep 2022' }, { task: 'Task 8', name: 'Vikram', status: '23 Sep 2022' }, { task: 'Task 9', name: 'Vedha', status: '24 Sep 2022' }, { task: 'Task 10', name: 'Shiva', status: '28 Sep 2022' }];
  monthlyTasks: any[] = [{ task: 'Task 1', name: 'Ravi', status: 'Completed' }, { task: 'Task 2', name: 'Adil', status: 'In Progress' }, { task: 'Task 6', name: 'Vivek', status: 'Pending' }, { task: 'Task 4', name: 'Roy', status: 'Completed' }, { task: 'Task 9', name: 'Vedha', status: 'Pending' }];

  boy = "./../../../../assets/images/boy.jpg";
  girl = "./../../../../assets/images/girl.jpg";
  profileImg = './../../../../assets/images/avatar.png'

  constructor(
    public router: Router,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    // this.getData(this.page)

    this.data2 = {
      labels: ['Completed', 'Pending', 'In Progress'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    }

    this.data = {
      labels: ['Completed', 'Pending', 'In Progress'],
      datasets: [
        {
          data: [1500, 120, 400],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    }

    this.chartOptions = this.getLightTheme()

    this.chartOptions2 = this.getLightTheme()

  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      }
    }
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    }
  }



  logout() {
    this.router.navigate(['/login'])
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged out succsesfully' });
  }


}
