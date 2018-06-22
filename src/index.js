import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma/css/bulma.min.css';

import { Tabs, Display } from './Display';

const App = () => {
  return (
    <div>
      <Tabs tabs={['2010', '2011', '2012', '2013']}/>
      <Display chart='airline'/>
      <Display chart='airport'/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));