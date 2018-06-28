import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';

import 'bulma/css/bulma.min.css';
import 'bulma-pageloader/dist/css/bulma-pageloader.min.css';

import { Tabs, Display } from './Display';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				airlineData: [{}],
				airportData: [{}],
			},
			currentYear: 2010,
			currentAirline: '',
			currentAirport: '',
		}

		let csvFile = require('' + this.props.file + '');
	  Papa.parse(csvFile, {
	    header: true,
	    download: true,
	    skipEmptyLines: true,
	    complete: (result) => {
	    	const data = result.data;
	    	this.parseData(data);
	    	this.hidePageloader();
	    }
		});
	}

	parseData = (csvData) => {
		if(csvData !== undefined){			
			let year, month, claimAmnt;
			/*
			    the Airline object contains all the claims that belong to a particular airline
			    the Airport object contains all the claims that belong to a particular airport
			*/
			class Airline {
			  constructor(name, claims, yr2010, yr2011, yr2012, yr2013){
			    this.name = name;
			    this.claims = [claims];
			    this.yr2010 = [];
			    this.yr2011 = [];
			    this.yr2012 = [];
			    this.yr2013 = [];
			  }
			}
			class Airport {
			  constructor(name, claims, yr2010, yr2011, yr2012, yr2013){
			    this.name = name;
			    this.claims = [claims];
			    this.yr2010 = [];
			    this.yr2011 = [];
			    this.yr2012 = [];
			    this.yr2013 = [];
			  }
			}
			class MonthlyClaim {
			  constructor(month, value, sum, avg){
			    this.month = month;
			    this.value = [value];
			    this.sum = sum;
			    this.avg = 0;
			  }
			  updateSum(val){
			    this.sum += val;
			    this.sum = parseFloat(this.sum.toFixed(2));
			  }
			  calcAvg(){
			    this.avg = parseFloat((this.sum / this.value.length).toFixed(2));
			    /*  
			        ?? stringified version of average for display purposes??
			        this.avg = (this.sum / this.value.length).toFixed(2);
			    */
			  }
			}
			let airlineClaims = [];
			let airportClaims = [];
			/*
			  iterate through csv data;
			  if output data structure doesn't contain airline, create new Airline obj, push claim data;
			  if output data structure contains current airline, locate it, push claim data;
			  if output data structure doesn't contain airport, create new Airport obj, push claim data;
			  if output data structure contains current airport, locate it, push claim data;
			*/
			csvData.forEach(function(val){
			  if(!(airlineClaims.some(function(element){ return element.name === val["Airline Name"].trim() }))){
			    airlineClaims.push(new Airline(val["Airline Name"].trim(), val));
			  }else{
			    airlineClaims[airlineClaims.findIndex(item => item.name === val["Airline Name"].trim())].claims.push(val);
			  }

			  if(!(airportClaims.some(function(element){ return element.name === val["Airport Code"].trim() }))){
			    airportClaims.push(new Airport(val["Airport Code"].trim(), val));
			  }else{
			    airportClaims[airportClaims.findIndex(item => item.name === val["Airport Code"].trim())].claims.push(val);
			  }
			});
			/*  
			    iterate through airlineClaims;
			    iterate through each airline's claim data;
			    determine year;
			    determine month;
			    if output data structure doesn't contain month, create new MonthlyClaim obj, push value
			    if output data structure contains current month, locate it, push value
			*/
			airlineClaims.forEach(function(airline){
			  airline.claims.forEach(function(claim){
			  	if(claim["Date Received"].split("-")[2] !== undefined){
			    	year = 'yr20' + claim["Date Received"].split("-")[2];
			    }
			    month = claim["Date Received"].split("-")[1];
			    claimAmnt = Number(claim["Close Amount"].replace(/[^0-9\.-]+/g,""))
			    if(!(isNaN(claimAmnt))){
			    	if(!(airline[year].some(function(element){ return element.month === month }))){
			    		airline[year].push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			    	}else{
			      airline[year][airline[year].findIndex(item => item.month === month)].value.push(claimAmnt);
			      airline[year][airline[year].findIndex(item => item.month === month)].updateSum(claimAmnt);
			    }
			    }
			  });
			});
			/*  
			    iterate through airportClaims;
			    iterate through each airport's claim data;
			    determine year;
			    determine month;
			    if output data structure doesn't contain month, create new MonthlyClaim obj, push value
			    if output data structure contains current month, locate it, push value
			*/
			airportClaims.forEach(function(airport){
			  airport.claims.forEach(function(claim){
			  	if(claim["Date Received"].split("-")[2] !== undefined){
			    	year = 'yr20' + claim["Date Received"].split("-")[2];
			    }
			    month = claim["Date Received"].split("-")[1];
			    claimAmnt = Number(claim["Close Amount"].replace(/[^0-9\.-]+/g,""))
			    if(!(isNaN(claimAmnt))){
			    	if(!(airport[year].some(function(element){ return element.month === month }))){
			    		airport[year].push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			    	}else{
			      airport[year][airport[year].findIndex(item => item.month === month)].value.push(claimAmnt);
			      airport[year][airport[year].findIndex(item => item.month === month)].updateSum(claimAmnt);
			    }
			    }
			  });
			  //  update average here
			  airport.yr2010.forEach(function(month){ month.calcAvg(); });
			  airport.yr2011.forEach(function(month){ month.calcAvg(); });
			  airport.yr2012.forEach(function(month){ month.calcAvg(); });
			  airport.yr2013.forEach(function(month){ month.calcAvg(); });
			});
			/*
			    set airlines with "-" to name "Unknown";
			    remove the last row from the data (<BR>);
			*/
			airlineClaims[airlineClaims.findIndex(item => item.name === "-")].name = "Unknown";
			airlineClaims.splice(-1, airlineClaims.length-1);
			airportClaims[airportClaims.findIndex(item => item.name === "-")].name = "Unknown";
			airportClaims.splice(-1, airportClaims.length-1);
			this.setState({ data:{
												airlineData: airlineClaims,
												airportData: airportClaims,
											},
											currentAirline: 0,
											currentAirport: 0
										});
		}
	}

	tabClick = (e) => {
		const currentYear = parseInt(e.currentTarget.id.substring(3, e.currentTarget.id.length), 10);
		this.setState({ currentYear });
	}

	optionChange = (e, c) => {
		const selected = e.target.value;
		if(c === 'airline'){
			const airlines = this.getAirlines();
			this.setState({ currentAirline: airlines.indexOf(selected) });
		}else if(c === 'airport'){
			const airports = this.getAirports();
			this.setState({ currentAirport: airports.indexOf(selected) });
		}
	}

	getAirlineData = () => {
		if(this.state.data.airlineData[0]['yr' + this.state.currentYear.toString()] !== undefined) {
			return this.state.data.airlineData[this.state.currentAirline]['yr' + this.state.currentYear.toString()].map(claim => claim.sum);
		}
	}

	getAirlines = () => {
		if(this.state.data.airlineData[0]['yr' + this.state.currentYear.toString()] !== undefined) {
			return this.state.data.airlineData.map(airline => airline.name);
		}
	}

	getAirportData = () => {
		if(this.state.data.airportData[0]['yr' + this.state.currentYear.toString()] !== undefined) {
			return this.state.data.airportData[this.state.currentAirport]['yr' + this.state.currentYear.toString()].map(claim => claim.sum);
		}
	}

	getAirports = () => {
		if(this.state.data.airportData[0]['yr' + this.state.currentYear.toString()] !== undefined) {
			return this.state.data.airportData.map(airport => airport.name);
		}
	}

	hidePageloader = () => {
		let timeout = setTimeout(() => {
			document.getElementById('pageloader').classList.toggle('is-active');
			clearTimeout(timeout);
		}, 2000);
	}

	render() {
		return (
	    <div>
	      <Tabs tabs={['2010', '2011', '2012', '2013']} currentYear={this.state.currentYear} onClick={this.tabClick} />
	      <Display chart='airline' data={this.getAirlineData()} options={this.getAirlines()} onChange={this.optionChange} />
	      <Display chart='airport' data={this.getAirportData()} options={this.getAirports()} onChange={this.optionChange} />
	      <div className='pageloader is-active' id='pageloader'><span className='title'>Loading...</span></div>
	    </div>
	  );
	}
}

ReactDOM.render(<App file='./data/claims-2010-2013_0.csv' />, document.getElementById('root'));