import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart: any;
  inputSymbol: string = "";

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

  addSymbol() {
    this.appService.addSymbol(this.inputSymbol);
    this.inputSymbol = "";
  }

  removeSymbol(index) {
    this.appService.removeSymbol(index);
  }

  setupChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: 'this.poll.options',
        datasets: [{
          data: 'this.poll.count',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
      }
    });
  }

  addData() {
    let count =  0 //this.poll.count;
    // count[this.option]++
    this.chart.data.datasets[0].data = count;
    this.chart.update();
  }

}
