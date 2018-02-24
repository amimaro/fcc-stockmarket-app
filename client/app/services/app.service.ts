import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  symbols: any[] = [];
  apiUrl: string = 'http://localhost:8080/api/stock/';

  constructor(private http: HttpClient) {
    if (this.isLocalEmpty()) {
      this.symbols = ['AMZN', 'TSLA', 'AAPL'];
      localStorage.setItem("stock-local", JSON.stringify(this.symbols));
    } else {
      this.symbols = JSON.parse(localStorage.getItem("stock-local"));
    }
  }

  getStock(interval = 'd1', symbol = 'MSFT') {
    return this.http.get(this.apiUrl + interval + '/' + symbol);
  }

  isLocalEmpty() {
    return localStorage.getItem("stock-local") === 'undefined' || localStorage.getItem("stock-local") === null;
  }

  addSymbol(symbol) {
    this.getStock('d1', symbol)
      .subscribe(
      res => {
        if (res.hasOwnProperty('Error Message')) {
          alert('Symbol doesn\'t exists');
        } else {
          console.log('Symbol exists');
          if (!this.symbols.includes(symbol.toUpperCase())) {
            this.symbols.push(symbol.toUpperCase());
            localStorage.setItem("stock-local", JSON.stringify(this.symbols));
            alert('Symbol Added');
          } else {
            alert('Symbol Already Added');
          }
        }
      },
      err => {
        console.error('Error: ')
        console.error(err);
      })
  }

  removeSymbol(index) {
    alert(this.symbols[index] + ' Removed')
    this.symbols.splice(index, 1);
    localStorage.setItem("stock-local", JSON.stringify(this.symbols));
  }

}
