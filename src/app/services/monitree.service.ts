import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { MonitreeModel } from '../shared/models/monitree-info.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MonitreeService {

  private monitreeModel: MonitreeModel;

  constructor(private http: HttpClient) {
    this.monitreeModel = new MonitreeModel();
  }

  public getMonitreeModel() { return this.monitreeModel; }
  public setMonitreeModel(data) { this.monitreeModel = data; }

  public getMonitreeReadings(start, end) {
    start = this.getDateTimeFormat(start);
    end = this.getDateTimeFormat(end);

    return this.http.get(location.origin + '/readings?startDate=' + start + '&endDate=' + end, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public getDateTimeFormat(inDate: Date) {
    // want format like 10-01-2018 00:00:00
    var returnDate = '';
    var date = inDate.getDate();
    var month = inDate.getMonth() + 1;
    var year = inDate.getFullYear();
    
    returnDate = month + '-' + date + '-' + year + ' 00:00:00';

    return encodeURIComponent(returnDate);
  }
}
