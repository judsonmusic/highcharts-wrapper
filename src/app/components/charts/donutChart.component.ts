import { Component, Input, OnInit } from '@angular/core';

declare var jQuery: any;
declare var Highcharts: any;

@Component({
  selector: 'donut-chart',
  template: `<div id="{{selector}}" style="margin: 0 auto"></div>`
})
export class DonutChartComponent implements OnInit {

  @Input() selector: string;
  @Input() heading: string;

  ngOnInit() {


  }

  constructor() {

  }


  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {

    var colors = Highcharts.getOptions().colors,
      categories = [
        "Chrome",
        "Firefox",
        "Internet Explorer"
      ],
      data = [
        {
          "y": 62.74,
          "color": colors[2],
          "drilldown": {
            "name": "Chrome",
            "categories": [
              "Chrome v65.0",
              "Chrome v64.0",
              "Chrome v63.0",
              "Chrome v62.0",
              "Chrome v61.0",
              "Chrome v60.0",
              "Chrome v59.0",
              "Chrome v58.0",
              "Chrome v57.0",
              "Chrome v56.0",
              "Chrome v55.0",
              "Chrome v54.0",
              "Chrome v51.0",
              "Chrome v49.0",
              "Chrome v48.0",
              "Chrome v47.0",
              "Chrome v43.0",
              "Chrome v29.0"
            ],
            "data": [
              0.1,
              1.3,
              53.02,
              1.4,
              0.88,
              0.56,
              0.45,
              0.49,
              0.32,
              0.29,
              0.79,
              0.18,
              0.13,
              2.16,
              0.13,
              0.11,
              0.17,
              0.26
            ]
          }
        },
        {
          "y": 10.57,
          "color": colors[1],
          "drilldown": {
            "name": "Firefox",
            "categories": [
              "Firefox v58.0",
              "Firefox v57.0",
              "Firefox v56.0",
              "Firefox v55.0",
              "Firefox v54.0",
              "Firefox v52.0",
              "Firefox v51.0",
              "Firefox v50.0",
              "Firefox v48.0",
              "Firefox v47.0"
            ],
            "data": [
              1.02,
              7.36,
              0.35,
              0.11,
              0.1,
              0.95,
              0.15,
              0.1,
              0.31,
              0.12
            ]
          }
        },
        {
          "y": 7.23,
          "color": colors[0],
          "drilldown": {
            "name": "Internet Explorer",
            "categories": [
              "Internet Explorer v11.0",
              "Internet Explorer v10.0",
              "Internet Explorer v9.0",
              "Internet Explorer v8.0"
            ],
            "data": [
              6.2,
              0.29,
              0.27,
              0.47
            ]
          }
        }
      ],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
      }
    }



    // Create the chart
    Highcharts.chart(this.selector, {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Browser market share, January, 2018'
      },
      subtitle: {
        text: 'Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      series: [{
        name: 'Browsers',
        data: browserData,
        size: '60%',
        dataLabels: {
          formatter: function () {
            return this.y > 5 ? this.point.name : null;
          },
          color: '#ffffff',
          distance: -30
        }
      }, {
        name: 'Versions',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
          formatter: function () {
            // display only if larger than 1
            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
              this.y + '%' : null;
          }
        },
        id: 'versions'
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            series: [{
              id: 'versions',
              dataLabels: {
                enabled: false
              }
            }]
          }
        }]
      }
    });

  }
}
