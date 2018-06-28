import React from 'react';

let BarChart = require('react-chartjs').Bar;
let LineChart = require('react-chartjs').Line;

const AirportChart = (d) => {
	let chartData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: [
					"rgba(51, 185, 219, 0.5)", 
					"rgba(146, 246, 156, 0.5)", 
					"rgba(195, 75, 75, 0.5)", 
					"rgba(232, 124, 126, 0.5)", 
					"rgba(144, 25, 255, 0.5)", 
					"rgba(121, 174, 235, 0.5)", 
					"rgba(255, 250, 112, 0.5)", 
					"rgba(239, 151, 240, 0.5)", 
					"rgba(255, 175, 56, 0.5)", 
					"rgba(191, 209, 0, 0.5)", 
					"rgba(50, 71, 173, 0.5)", 
					"rgba(5, 163, 7, 0.5)"
				],
				strokeColor: [
					"rgba(51, 185, 219, 1)", 
					"rgba(146, 246, 156, 1)", 
					"rgba(195, 75, 75, 1)", 
					"rgba(232, 124, 126, 1)", 
					"rgba(144, 25, 255, 1)", 
					"rgba(121, 174, 235, 1)", 
					"rgba(255, 250, 112, 1)", 
					"rgba(239, 151, 240, 1)", 
					"rgba(255, 175, 56, 1)", 
					"rgba(191, 209, 0, 1)", 
					"rgba(50, 71, 173, 1)", 
					"rgba(5, 163, 7, 1)"
				],
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data: d.data
			}
		]
	};

	let chartOptions = {
		//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
		scaleBeginAtZero : true,
		//Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,
		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",
		//Number - Width of the grid lines
		scaleGridLineWidth : 1,
		//Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines: true,
		//Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines: true,
		//Boolean - If there is a stroke on each bar
		barShowStroke : true,
		//Number - Pixel width of the bar stroke
		barStrokeWidth : 2,
		//Number - Spacing between each of the X value sets
		barValueSpacing : 5,
		//Number - Spacing between data sets within X values
		barDatasetSpacing : 1,
	};

	return (
		<BarChart data={chartData} options={chartOptions} width="800" height="400"/>
	);
}

const AirlineChart = (d) => {
	let chartData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(51, 185, 219, 0.2)",
				strokeColor: "rgba(51, 185, 219, 1)",
				pointColor: "rgba(51, 185, 219, 1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: d.data
			}
		]
	};

	let chartOptions = {
		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,
		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",
		//Number - Width of the grid lines
		scaleGridLineWidth : 1,
		//Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines: true,
		//Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines: true,
		//Boolean - Whether the line is curved between points
		bezierCurve : true,
		//Number - Tension of the bezier curve between points
		bezierCurveTension : 0.4,
		//Boolean - Whether to show a dot for each point
		pointDot : true,
		//Number - Radius of each point dot in pixels
		pointDotRadius : 4,
		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,
		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 20,
		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,
		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,
	};

	return (
		<LineChart data={chartData} options={chartOptions} width="800" height="400"/>
	);
}

export { AirportChart, AirlineChart };