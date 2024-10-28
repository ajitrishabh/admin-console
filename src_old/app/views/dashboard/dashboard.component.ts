import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { MasterService } from 'src/app/services/master.service';
import { ChartOptions } from 'chart.js';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { BaseChartDirective } from 'ng2-charts';
import * as moment from 'moment';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers : [MasterService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) public chart: BaseChartDirective | undefined;
  locations: any = [];
  functions: any = [];
  location: any = [];
  function: any = [];
  typeList: any = [];
  criticalities: any = [];
  frequencies: any = [];
  type:any='';
  criticality:any='';
  visible: boolean = false;
  cp_list: any = [];
  cp_counts: any = [];
  graph: any = [];
  statusList: any = [];
  date:any = [moment().startOf('month').toDate(),moment().endOf('month').toDate()];
  
  constructor(private chartsData: DashboardChartsData, private masterService:MasterService,public global:GlobalService) {
  }

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];
  public mainChart: IChartProps = {};
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } }
  };
  public pieChartLabels:string[] = [];
  public pieChartDatasets = [{
    data: []
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit(): void {
    this.global.filterButton=true;
    this.initCharts();
    this.loadMom();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  loadMom() {
    forkJoin(
      {
        cp_type: this.masterService.get('cp_type'),
        risk: this.masterService.get('risk')
      }
    ).subscribe(({cp_type,risk}) => {
      this.typeList = cp_type.data;
      this.criticalities = risk.data;
    })
  }

  countByType(items:any, type:any) {
    return (this.cp_counts.map((a:any) => a[type])).reduce((a:string, b:string) => parseInt(a) + parseInt(b));
  }

  setStatusColor(status:string) {
    let f = this.statusList.find((a:any) => a.name == status);
    if(f) {
      let other = f.other ? JSON.parse(f.other) : null;
      return other ? other.color : '#aeaeae';
    }
    return '#aeaeae';
  }

  ngOnDestroy() {
    this.global.filterButton=false;
  }




}
