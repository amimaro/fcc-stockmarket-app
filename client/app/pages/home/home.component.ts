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
  begin: string = "";
  end: string = "";

  constructor(public appService: AppService) { }

  ngOnInit() {
    // this.setupChart()
  }

  addSymbol() {
    this.appService.addSymbol(this.inputSymbol);
    this.inputSymbol = "";
  }

  removeSymbol(index) {
    this.appService.removeSymbol(index);
  }

  setInterval(interval) {
    this.appService.setInterval(interval);
  }

  setupChart() {

    this.chart = new Chart('canvas', {
      type: 'line',
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
    let count = 0 //this.poll.count;
    // count[this.option]++
    this.chart.data.datasets[0].data = count;
    this.chart.update();
    // if (config.data.datasets.length > 0) { config is chart
    //             var month = MONTHS[config.data.labels.length % MONTHS.length];
    //             config.data.labels.push(month);
    //
    //             config.data.datasets.forEach(function(dataset) {
    //                 dataset.data.push(randomScalingFactor());
    //             });
    //
    //             window.myLine.update();
    //         }
  }

}
