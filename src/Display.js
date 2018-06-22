import React from 'react';
import AirlineChart from './LineChart';
import AirportChart from './BarChart';

const Display = (c) => {
	const getChart = (chart) => {
		if (chart === 'airline') {
			return <AirlineChart data={[11, 75, 35, 63, 77, 78, 48, 89, 9, 97, 69, 7]}/>;
		} else {
			return <AirportChart data={[53, 64, 97, 33, 37, 30, 4, 15, 13, 37, 15, 79]}/>;
		}
	}

	return (
		<section>
			<div className='level'>
				<div className='level-item'>
					<div className='conatiner is-fluid has-text-centered'>
						{getChart(c.chart)}
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

const Tabs = (t) => {
	return (
		<section id='tabs'>
			<div className='container is-fluid'>
				<div className='tabs is-centered is-fullwidth'>
				  <ul>
				  	{t.tabs.map(function callback(tab, i) {
			  			if(i===0) { return(<li key={'tab' + tab} className='is-active'><a>{tab}</a></li>); } else { return(<li key={'tab' + tab}><a>{tab}</a></li>); }
						})} 
				  </ul>
				</div>
			</div>
		</section>
	);
}

export { Tabs, Display };