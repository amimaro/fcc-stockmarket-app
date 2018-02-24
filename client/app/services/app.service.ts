import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  symbols: any[] = [];
  apiUrl: string = 'http://localhost:8080/api/stock/';

  constructor(private http: HttpClient) { }

  getStock(interval = 'd1', symbol = 'MSFT') {
    return this.http.get(this.apiUrl + interval + '/' + symbol);
  }

  addSymbol(symbol) {
    this.getStock('d1', symbol)
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      })
  }

}
