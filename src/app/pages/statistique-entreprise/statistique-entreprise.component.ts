import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from 'ng-apexcharts';
import { Entreprise } from 'src/app/model/entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { StatitsiqteserviceService } from 'src/app/service/statitsiqteservice.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-statistique-entreprise',
  templateUrl: './statistique-entreprise.component.html',
  styleUrls: ['./statistique-entreprise.component.scss']
})
export class StatistiqueEntrepriseComponent {
  public chartOptions: Partial<ChartOptions> | any = {}; // Initialize chartOptions as an empty object

  constructor(private es: EntrepriseServiceService, private ss: StatitsiqteserviceService) {
    this.es.getEntreprises().subscribe((data) => {
      const entrepriseNames = data.map((company) => company.nom);
      const approvedDataArray: number[] = [];
      const notApprovedDataArray: number[] = [];

      // Fetch approved and notApproved data for each company using forkJoin
      const observablesArray: Observable<any>[] = data.map((company) =>
        forkJoin({
          approved: this.ss.getCreditsperparent(company.entrpriseId),
          notApproved: this.ss.getCreditrefsperparent(company.entrpriseId),
        })
      );

      forkJoin(observablesArray).subscribe((results) => {
        console.log('Results:', results);
        results.forEach((result) => {
          approvedDataArray.push(result.approved);
          notApprovedDataArray.push(result.notApproved);
        });
        console.log(approvedDataArray, notApprovedDataArray); // Log the processed data
        this.chartOptions = {
          series: [
            {
              name: 'credit refusé',
              data: approvedDataArray,
            },
            {
              name: 'credit accepté',
              data: notApprovedDataArray,
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: true,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            type: 'category',
            categories: entrepriseNames, // Use the company names as x-axis categories
          },
          legend: {
            position: 'right',
            offsetY: 40,
          },
          fill: {
            opacity: 1,
          },
        };
        this.updateChart();
      });
    });
  }
  
  updateChart(): void {
    // Update the chart options when data is available
    if (this.chartOptions.series && this.chartOptions.series.length > 0) {
      this.chartOptions = { ...this.chartOptions }; // Make a shallow copy to trigger change detection
    }
  }
  ngOnInit(): void {
    this.ss.getCreditrefsperparent(3).subscribe(
      data=>{
        console.log("data",data);
      }
    )
    this.ss.getCreditsperparent(3).subscribe(
      data=>{
        console.log("data",data);
      }
    )
  }
}
