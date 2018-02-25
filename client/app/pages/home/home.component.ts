import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

import { Chart } from 'chart.js';
import * as randomColor from 'randomcolor';

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
  time: any[] = [];
  info: string = "";

  dataset: any = {};

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.setupChart();
    this.buildChart();
  }

  setupChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    });
  }

  buildChart() {
    this.appService.symbols.map((symbol) => {
      this.getDataset(symbol)
    })
  }

  getDataset(symbol) {
    this.appService.getStock(symbol)
      .subscribe(
      res => {
        console.log(res);
        this.info = res['Meta Data']['1. Information']
        let symbol = res['Meta Data']['2. Symbol'];
        let data = Object.values(res)[1];
        let prices = [];
        let color = this.getColor();

        this.time = Object.keys(data).reverse();
        this.begin = this.time[0];
        this.end = this.time[this.time.length-1];

        // Get just close price
        Object.values(data).map((val) => {
          prices.push(val['4. close'])
        });
        prices.reverse()

        this.dataset = {
          data: prices,
          label: symbol,
          borderColor: color,
          backgroundColor: color,
          fill: false,
        }

        this.addDataset(this.dataset);
      },
      err => {

      })
  }

  resetChart() {
    this.chart.data.labels = [];
    this.chart.data.datasets = [];
    this.chart.update();
  }

  addDataset(dataset) {
    this.chart.data.labels = this.time;
    this.chart.data.datasets.push(dataset);
    this.chart.update();
  }

  removeDataset(index) {
    this.chart.data.datasets.splice(index, 1);
    this.chart.update();
  }

  addSymbol() {
    this.appService.addSymbol(this.inputSymbol);
    this.getDataset(this.inputSymbol)
    this.inputSymbol = "";
  }

  removeSymbol(index) {
    this.appService.removeSymbol(index);
    this.removeDataset(index);
  }

  setInterval(interval) {
    this.appService.setInterval(interval);
    this.resetChart();
    this.buildChart();
  }

  getColor() {
    return randomColor({
      luminosity: 'bright',
      format: 'rgb'
    });
  }

}
