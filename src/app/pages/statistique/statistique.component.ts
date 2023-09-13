import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";


import { StatitsiqteserviceService } from 'src/app/service/statitsiqteservice.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>| any;
  cref: Number;
  cr: Number;
  label: Array<string> =["crédits refusés", "crédit acceptés"];
  constructor(private stat: StatitsiqteserviceService) {
  
    // Initialize cref and cr variables to 0
    this.cref = 0;
    this.cr = 0;

    // Fetch your data from the service here and assign it to 'cref' and 'cr' variables
    this.stat.getCreditsper().subscribe(
      data => {
        this.cr = data;
        // Update the chartOptions with the new data
        this.updateChartOptions();
      }
    );
    this.stat.getCreditsrefper().subscribe(
      data => {
        this.cref = data;
        // Update the chartOptions with the new data
        this.updateChartOptions();
  
      }
    );
  }
  // Function to update the chart options when new data is available
  updateChartOptions() {
    this.chartOptions = {
      series: [this.cref, this.cr], // Use your data here
      chart: {
        type: "donut"
      },
      labels: ["crédit refusé", "crédit accepté"], // Use your custom labels here
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  isChartOptionsDefined(): boolean {
    return this.chartOptions && this.chartOptions.series;
  }
  
}
