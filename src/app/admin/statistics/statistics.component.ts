import { Component, OnInit } from '@angular/core';
import { IndicatorService } from 'src/app/core/services/indicator.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    dataproductsbycategory: number[] = [];
    labelproductsbycategory: string[] = [];
    dataactivities: number[] = [];
    dataorders: number[] = [];
    labelsactivitiesandorders: string[] = [];
    datatransactionoutput: number[] = [];
    datatransactioninput: number[] = [];
    labeltransactions: string[] = [];
    multiAxisOptions: any;
    multiAxisData: any;
    datapie: any;
    datacombo: any;
    chartOptionscombo: any;
    constructor(public _indicators:IndicatorService) { }
    ngOnInit(): void {
        this._indicators.productByCategory().subscribe(data=>{
            this.labelproductsbycategory=data.chart.labels;
            this.dataproductsbycategory=data.chart.data;
            this.initChatProductsByCategory();
        })
        this._indicators.stock().subscribe(data=>{
            this.labeltransactions=data.chart.labels;
            this.datatransactioninput=data.chart.ingreso;
            this.datatransactionoutput=data.chart.salida;
            this.initChartStock();
        })
        this._indicators.ordersAndActivities().subscribe(data=>{
            this.labelsactivitiesandorders=data.chart.labels;
            this.dataorders=data.chart.orders;
            this.dataactivities=data.chart.activities;
            this.initChartOrdersAndActivities();
        })
    }
    initChatProductsByCategory() {
        this.datapie = {
            labels: this.labelproductsbycategory,
            datasets: [
                {
                    data: this.dataproductsbycategory,
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726"
                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D",
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D",
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D"
                    ]
                }
            ]
        };

    }
    initChartOrdersAndActivities() {
        this.multiAxisData = {
            labels: this.labelsactivitiesandorders,
            datasets: [{
                label: 'Actividades',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    '#7E57C2',
                    '#66BB6A',
                    '#FFCA28',
                    '#26A69A'
                ],
                yAxisID: 'y',
                data: this.dataactivities
            }, {
                label: 'Alimentos',
                backgroundColor: '#78909C',
                yAxisID: 'y1',
                data: this.dataorders
            }]
        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    }
                }
            }
        };
    }
    initChartStock() {
        this.datacombo = {
            labels: this.labeltransactions,
            datasets: [{
                type: 'bar',
                label: 'Entrada de productos',
                backgroundColor: '#66BB6A',
                data: this.datatransactioninput,
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Salida de productos',
                backgroundColor: '#FFA726',
                data: this.datatransactionoutput
            }]
        };

        this.chartOptionscombo = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context:any) {
                            var label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += "S/ "+ context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }

}

