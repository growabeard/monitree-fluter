import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import { MonitreeService } from './services/monitree.service';
import { READINGS } from './mock-readings';
import { MonitreeModel } from './shared/models/monitree-info.model';
import { Graphable } from './shared/models/graphable.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monitree-front';
  readings: MonitreeModel[] = [];
  temperatures: Graphable = new Graphable();
  moistures: Graphable = new Graphable();
  lights: Graphable = new Graphable();
  humidities: Graphable = new Graphable();
  tsLabels: string[];
  start=  new Date();
  end=  new Date();
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private monitreeService:MonitreeService) {
    this.temperatures.label = 'Temp';
    this.temperatures.data = [];
    this.moistures.label = 'Moisture';
    this.moistures.data = [];
    this.lights.label = 'Light';
    this.lights.data = [];
    this.humidities.label = 'Humidity';
    this.humidities.data = [];
    this.tsLabels = [];
    this.start.setDate(this.start.getDate() - 7);
  }

  getMonitreeReadings() {
    this.monitreeService.getMonitreeReadings(this.start, this.end).subscribe(data => {
        this.readings = data;  
        //this.readings = READINGS;
      },
      err => console.error(err)
    );
    this.readings.forEach(reading => {
      this.temperatures.data.push(reading.temp);
      this.moistures.data.push(reading.moisture);
      this.lights.data.push(reading.light);
      this.humidities.data.push(reading.humidity);
      this.tsLabels.push(reading.date);
    });

    this.chart.chart.update();
  }

  updateStart(event) {
    this.start = event.value;
  }

  updateEnd(event) {
    this.end = event.value;
  }

  public lineChartData = [
    this.temperatures,
    this.moistures,
    this.lights,
    this.humidities
  ];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
