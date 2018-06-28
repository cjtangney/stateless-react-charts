import React from 'react';
import { AirlineChart, AirportChart } from './Charts';

const Display = (e) => {
	const getChart = (chart) => {
		if(e.data !== undefined){
		  if (chart === 'airline') {
		  	return <AirlineChart data={e.data} />;
		  } else {
		  	return <AirportChart data={e.data} />;
		  }
		}
	}

	const optionChange = (event) => {
		e.onChange(event, e.chart);
	}

	const getOptions = (options) => {
		if(e.data !== undefined){
			return(
				<div className='select'>
			    <select onChange={optionChange}>
				    {options.map(function callback(option, i) {
				    	return(<option key={e.chart + '_option_' + i} value={option}>{option}</option>);
						})} 
			    </select>
			  </div>
			)
		}else{
			return(
				<div className='select is-loading'>
			    <select defaultValue='Loading' disabled>
			    	<option value='Loading'>Loading</option>
			    </select>
			  </div>
			)
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
					  {getOptions(e.options)}
					</div>
				</div>
			</div>
		</section>
	);
}

const Tabs = (e) => {
	const tabClick = (event) => {
		e.onClick(event);
	}

	return (
		<section id='tabs'>
			<div className='container is-fluid'>
				<div className='tabs is-centered is-fullwidth'>
				  <ul>
				  	{e.tabs.map(function callback(tab, i) {
				  		if(tab === e.currentYear.toString()) { 
				  			return(<li key={'tab' + tab} id={'tab' + tab} className='is-active' onClick={tabClick}><a>{tab}</a></li>); 
				  		} else { 
				  			return(<li key={'tab' + tab} id={'tab' + tab}  onClick={tabClick}><a>{tab}</a></li>); 
				  		}
						})} 
				  </ul>
				</div>
			</div>
		</section>
	);
}

export { Tabs, Display };