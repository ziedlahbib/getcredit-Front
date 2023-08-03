import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { forkJoin } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

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
import { Magasin } from 'src/app/model/magasin';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';

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
  selector: 'app-statistique-magasin',
  templateUrl: './statistique-magasin.component.html',
  styleUrls: ['./statistique-magasin.component.scss']
})
export class StatistiqueMagasinComponent {
  public chartOptions: Partial<ChartOptions> | any = {}; // Initialize chartOptions as an empty object
  loading = false;
  listofMagasin: Magasin[] = [];
  listofEntreprise: Entreprise[] = [];
  public entform: FormGroup;
  loadingm = false;
  filteredOptionsmagasin: Observable<any[]>;
  filteredOptions: Observable<any[]>;
  myControl = new FormControl();
  myControlmagasin = new FormControl();
  matFormFieldHidePlaceholder: boolean = false;
  approvedDataArray: number[] = [];
  notApprovedDataArray: number[] = [];

  constructor(
    private es: EntrepriseServiceService,
    private ss: StatitsiqteserviceService,
    private formBuilder: FormBuilder,
    private ms: MagasinServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.entrepriseform();
    this.getentreprise();
    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    this.filteredOptionsmagasin = this.myControlmagasin.valueChanges.pipe(startWith(''), map(value => this._filtermagasin(value)));

    // Initialize the chart with some default data
    this.chartOptions = {
      series: [
        {
          name: 'credit refusé',
          data: [], // Initialize with empty data array
        },
        {
          name: 'credit accépté',
          data: [], // Initialize with empty data array
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
        categories: [], // Initialize with empty categories
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };
  }

  entrepriseform() {
    this.entform = this.formBuilder.group({
      entrpriseId: ['', Validators.required],
    });

    this.entform.valueChanges.subscribe((data) => {
      console.log(this.entform.value);
    });
  }

  verifierentreprise(listE: Entreprise[]) {
    this.loading = listE.length > 0;
  }

  verifiermagasin(listM: Magasin[]) {
    this.loadingm = listM.length > 0;
  }

  updateChart(): void {
    // Update the chart data with the new data
    if (this.chartOptions.series && this.chartOptions.series.length > 0) {
      this.chartOptions.series[0].data = this.approvedDataArray;
      this.chartOptions.series[1].data = this.notApprovedDataArray;
      this.chartOptions.xaxis.categories = this.listofMagasin.map((magasin) => magasin.addresse);
      this.chartOptions = { ...this.chartOptions }; // Make a shallow copy to trigger change detection
    }
  }

  getentreprise() {
    this.es.getEntreprises().subscribe((data) => {
      this.listofEntreprise = data;
      this.verifierentreprise(data);
    });
  }

  // ... (previous code)

  getmagasins(event: MatSelectChange) {
    const value = event.value;
    this.ms.getmagasinsbyentreprise(Number(value)).subscribe((res) => {
      this.listofMagasin = res;
      this.verifiermagasin(this.listofMagasin);

      // Fetch approved and notApproved data for each magasin using forkJoin
      const observablesArray: Observable<any>[] = this.listofMagasin.map((magasin) =>
        forkJoin({
          approved: this.ss.getCreditsperparent(magasin.magasinId),
          notApproved: this.ss.getCreditrefsperparent(magasin.magasinId),
        })
      );

      forkJoin(observablesArray).subscribe((results) => {
        this.approvedDataArray = [];
        this.notApprovedDataArray = [];

        results.forEach((result) => {
          this.approvedDataArray.push(result.approved);
          this.notApprovedDataArray.push(result.notApproved);
        });

        // Update the chart data with the new data
        this.updateChart();
      });
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listofEntreprise.filter((option) => option.nom.toLowerCase().includes(filterValue));
  }

  private _filtermagasin(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listofMagasin.filter((option) => option.addresse.toLowerCase().includes(filterValue));
  }

  isChartOptionsDefined(): boolean {
    return this.chartOptions && this.chartOptions.series && this.chartOptions.series[0].data.length > 0;
  }
}
