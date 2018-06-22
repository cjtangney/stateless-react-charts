import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';

import 'bulma/css/bulma.min.css';

import { Tabs, Display } from './Display';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.updateData = this.updateData.bind(this);
	}

	componentDidMount() {
		let csvFile = require("./data/claims-2010-2013_0.csv");
	  Papa.parse(csvFile, {
	    header: true,
	    download: true,
	    skipEmptyLines: true,
	    complete: this.updateData
		});
	}

	updateData(result) {
		const data = result.data;
		this.setState({ data });
	}

	render() {
		return (
	    <div>
	      <Tabs tabs={['2010', '2011', '2012', '2013']}/>
	      <Display chart='airline' /*data={this.state.data}*//>
	      <Display chart='airport' /*data={this.state.data}*//>
	    </div>
	  );
	}
}

ReactDOM.render(<App />, document.getElementById('root'));