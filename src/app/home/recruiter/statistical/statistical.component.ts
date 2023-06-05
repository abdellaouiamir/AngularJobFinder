import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
// import * as Chart from 'chart.js';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {

  months = ["Jan", "Feb", "Mar", "Apr", "May"];
  jobPostingsTrend = [10, 15, 8, 12, 18];
  numberOfPosts = 55
  // canvas!: HTMLCanvasElement

  // this.canvas = this.elementRef.nativeElement.querySelector('#chart')
  // ctx = document.getElementById('mychart')
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    var mychart = new Chart("mychart", {
      type: "line",
      data: {
        labels: this.months,
        datasets: [{
          label: "Job Postings Trend",
          data: this.jobPostingsTrend,
          borderColor: "#36A2EB",
          fill: false
        }]
      },
      options: {
        responsive: true
      }
    });

    const applicationStatus = ["Pending", "Accepted", "Rejected"];
    const jobApplications = [20, 15, 10];

    // Create a bar chart
    new Chart("barChart2", {
      type: "bar",
      data: {
        labels: applicationStatus,
        datasets: [{
          label: "Job Applications by Status",
          data: jobApplications,
          backgroundColor: "rgba(75, 192, 192, 0.8)"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        } 
      }
    }as ChartConfiguration);

    ////////////////////////
    const scatterPlotData = {
      datasets: [{
        label: 'Quiz Scores vs. Similarity Scores',
        data: [
          { x: 80, y: 30 },
          { x: 60, y: 40 },
          { x: 70, y: 25 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    };

    new Chart("hi", {
      type: 'scatter',
      data: scatterPlotData,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Quiz Scores'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Similarity Scores'
            }
          }
        }
      }
    }as ChartConfiguration);

    ////////////////
    const similarityScoresData = {
      labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
      datasets: [{
        label: 'Frequency Score',
        data: [50, 80, 120, 90, 60],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    new Chart("hi2", {
      type: 'bar',
      data: similarityScoresData,
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            fontSize: 30,
            fontStyle: 'italic', // Apply italic style to the legend labels
            fontWeight: 'bold', // Apply bold style to the legend labels
            fontColor: 'black', // Apply custom font color to the legend labels
            font: {
              size: 30
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Similarity Scores'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frequency'
            }
          }
        }
      }
    }as ChartConfiguration); 
  }
}

