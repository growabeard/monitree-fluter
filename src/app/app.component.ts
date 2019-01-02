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
  readings;
  temperatures: Graphable = new Graphable();
  moistures: Graphable = new Graphable();
  lights: Graphable = new Graphable();
  humidities: Graphable = new Graphable();
  watered: boolean[];
  tsLabels: string[];
  start=  new Date();
  end=  new Date();
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private monitreeService:MonitreeService) {
    this.temperatures.label = 'Temp';
    this.temperatures.data = [];
    this.temperatures.fill = false;
    this.temperatures.pointRadius = 0;
    this.moistures.label = 'Moisture';
    this.moistures.data = [];
    this.moistures.fill = false;
    this.moistures.pointRadius = 0;
    this.lights.label = 'Light';
    this.lights.data = [];
    this.lights.fill = false;
    this.lights.pointRadius = 0;
    this.humidities.label = 'Humidity';
    this.humidities.data = [];
    this.humidities.fill = false;
    this.humidities.pointRadius = 0;
    this.tsLabels = [];
    this.start.setDate(this.start.getDate() - 7);
    this.end.setDate(this.end.getDate() + 1);
    this.watered = [];
  }

  getMonitreeReadings() {
    this.monitreeService.getMonitreeReadings(this.start, this.end).subscribe(data => {
        this.readings = data;
        // this.readings = READINGS;

        this.temperatures.data = [];
        this.moistures.data = [];
        this.lights.data = [];
        this.humidities.data = [];
        this.tsLabels = [];
        this.watered = [];

        this.readings.forEach(reading => {
          this.temperatures.data.push(reading.temp);
          this.moistures.data.push(reading.moisture);
          this.lights.data.push(reading.light);
          this.humidities.data.push(reading.humidity);
          this.tsLabels.push(reading.date);
          this.watered.push(reading.watered);
        });
    
        this.chart.chart.update();
      },
      err => console.error(err)
    );
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
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
              ticks: {
                  display: false
              }
        }
      ]
    },
    tooltips: {
      mode: 'label',
    },
    hover: {
      mode: 'label'
    },
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
