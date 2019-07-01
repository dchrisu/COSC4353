import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Pages
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import ClientRegistration from './Pages/ClientRegistration/ClientRegistration';
import ClientProfileManagement from './Pages/ClientProfileManagement/ClientProfileManagement';
import FuelQuoteForm from './Pages/FuelQuoteForm/FuelQuoteForm';
import FuelQuoteHistory from './Pages/FuelQuoteHistory/FuelQuoteHistory';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ minHeight: '100vh', paddingBottom: '200px', position: 'relative' }}>
          <Route exact path='/' component={Home} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/ClientRegistration' component={ClientRegistration} />
          <Route exact path='/ClientProfileManagement' component={ClientProfileManagement} />
          <Route exact path='/FuelQuoteForm' component={FuelQuoteForm} />
          <Route exact path='/FuelQuoteHistory' component={FuelQuoteHistory} />
        </div>
      </Router >
    );
  }
}
export default App;
