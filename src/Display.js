import React from 'react';
import { AirlineChart, AirportChart } from './Charts';

const Display = (e) => {
	const getChart = (chart) => {
		if(e.data !== undefined){
			let csvData = e.data;
			let year, month, claimAmnt;
		  if (chart === 'airline') {
			  /*
			      the Airline object contains all the claims that belong to a particular airline
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
			  class MonthlyClaim {
			    constructor(month, value, sum){
			      this.month = month;
			      this.value = [value];
			      this.sum = sum;
			    }

			    updateSum(val){
			      this.sum += val;
			    }
			  }
			  let airlineClaims = [];
			  /*
			    iterate through csv data;
			    if output data structure doesn't contain airline, create new Airline obj, push claim data;
			    if output data structure contains current airline, locate it, push claim data;
			  */
			  csvData.forEach(function(val){
			    if(!(airlineClaims.some(function(element){ return element.name === val["Airline Name"].trim() }))){
			      airlineClaims.push(new Airline(val["Airline Name"].trim(), val));
			    }else{
			      airlineClaims[airlineClaims.findIndex(item => item.name === val["Airline Name"].trim())].claims.push(val);
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
			      year = claim["Date Received"].split("-")[2];
			      month = claim["Date Received"].split("-")[1];
			      claimAmnt = Number(claim["Close Amount"].replace(/[^0-9\.-]+/g,""))
			      switch(year){
			        case "10" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airline.yr2010.some(function(element){ return element.month === month }))){
			              airline.yr2010.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airline.yr2010[airline.yr2010.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airline.yr2010[airline.yr2010.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        case "11" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airline.yr2011.some(function(element){ return element.month === month }))){
			              airline.yr2011.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airline.yr2011[airline.yr2011.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airline.yr2011[airline.yr2011.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        case "12" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airline.yr2012.some(function(element){ return element.month === month }))){
			              airline.yr2012.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airline.yr2012[airline.yr2012.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airline.yr2012[airline.yr2012.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        case "13" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airline.yr2013.some(function(element){ return element.month === month }))){
			              airline.yr2013.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airline.yr2013[airline.yr2013.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airline.yr2013[airline.yr2013.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        default :
			          break;
			      }
			    });
			  });
			  /*
			      set airlines with "-" to name "Unknown";
			      remove the last row from the data (<BR>);
			  */
			  airlineClaims[airlineClaims.findIndex(item => item.name === "-")].name = "Unknown";
			  airlineClaims.splice(-1, airlineClaims.length-1);
			  let data = eval('airlineClaims[' + 0 + '].yr' + e.currentYear + '.map(val => val.sum);');
				return <AirlineChart data={data}/>;
			} else {
			  /*
			      the Airport object contains all the claims that belong to a particular airport
			  */
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
			    }
			    calcAvg(){
			      this.avg = this.sum / this.value.length;
			      /*  
			          ?? stringified version of average for display purposes??
			          this.avg = (this.sum / this.value.length).toFixed(2);
			      */
			    }
			  }
			  let airportClaims = [];
			  /*
			      iterate through csv data;
			      if output data structure doesn't contain airport, create new Airport obj, push claim data;
			      if output data structure contains current airport, locate it, push claim data;
			  */
			  csvData.forEach(function(val){
			    if(!(airportClaims.some(function(element){ return element.name === val["Airport Code"].trim() }))){
			      airportClaims.push(new Airport(val["Airport Code"].trim(), val));
			    }else{
			      airportClaims[airportClaims.findIndex(item => item.name === val["Airport Code"].trim())].claims.push(val);
			    }
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
			      year = claim["Date Received"].split("-")[2];
			      month = claim["Date Received"].split("-")[1];
			      claimAmnt = Number(claim["Close Amount"].replace(/[^0-9\.-]+/g,""))
			      switch(year){
			        case "10" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airport.yr2010.some(function(element){ return element.month === month }))){
			              airport.yr2010.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airport.yr2010[airport.yr2010.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airport.yr2010[airport.yr2010.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        case "11" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airport.yr2011.some(function(element){ return element.month === month }))){
			              airport.yr2011.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airport.yr2011[airport.yr2011.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airport.yr2011[airport.yr2011.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        case "12" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airport.yr2012.some(function(element){ return element.month === month }))){
			              airport.yr2012.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airport.yr2012[airport.yr2012.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airport.yr2012[airport.yr2012.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        case "13" :
			          if(claimAmnt !== 0 && !(isNaN(claimAmnt))){
			            if(!(airport.yr2013.some(function(element){ return element.month === month }))){
			              airport.yr2013.push(new MonthlyClaim(month, claimAmnt, claimAmnt));
			            }else{
			              airport.yr2013[airport.yr2013.findIndex(item => item.month === month)].value.push(claimAmnt);
			              airport.yr2013[airport.yr2013.findIndex(item => item.month === month)].updateSum(claimAmnt);
			            }
			          }
			          break;
			        default :
			          break;
			      }
			    });
			    //  update average here
			    airport.yr2010.forEach(function(month){ month.calcAvg(); });
			    airport.yr2011.forEach(function(month){ month.calcAvg(); });
			    airport.yr2012.forEach(function(month){ month.calcAvg(); });
			    airport.yr2013.forEach(function(month){ month.calcAvg(); });
			  });
			  /*
			      set airports with "-" to name "Unknown";
			      remove the last row from the data (<BR>);
			  */
			  airportClaims[airportClaims.findIndex(item => item.name === "-")].name = "Unknown";
			  airportClaims.splice(-1, airportClaims.length-1);
			  let data = eval('airportClaims[' + 0 + '].yr' + e.currentYear + '.map(val => val.avg);');
				return <AirportChart data={data}/>;
			}
		}
	}

	return (
		<section id={e.chart}>
			<div className='level'>
				<div className='level-item'>
					<div className='conatiner is-fluid has-text-centered'>
						{getChart(e.chart)}
					</div>
				</div>
			</div>
			<div className='level'>
				<div className='level-item'>
					<div className='conatiner is-fluid has-text-centered'>
					  <div className='select is-loading'>
					    <select defaultValue='Loading' disabled>
					    	<option value='Loading'>Loading</option>
					    </select>
					  </div>
					</div>
				</div>
			</div>
		</section>
	);
}

const Tabs = (e) => {
	const clicky = (event) => {
		e.onClick(event);
	}

	return (
		<section id='tabs'>
			<div className='container is-fluid'>
				<div className='tabs is-centered is-fullwidth'>
				  <ul>
				  	{e.tabs.map(function callback(tab, i) {
			  			if(i===0) { return(<li key={'tab' + tab} id={'tab' + tab} className='is-active' onClick={clicky}><a>{tab}</a></li>); } else { return(<li key={'tab' + tab} id={'tab' + tab}  onClick={clicky}><a>{tab}</a></li>); }
						})} 
				  </ul>
				</div>
			</div>
		</section>
	);
}

export { Tabs, Display };