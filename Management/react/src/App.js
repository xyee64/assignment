import React, { Component } from 'react';
import Login from './Component/Login';
import { Switch,  BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './Component/Profile';
import Register from './Component/Register';
import Home from './Component/Home';
import EmployeeProfile from './Component/EmployeeProfile';
import EmployeeList from './Component/EmployeeList';
import EmployeeDetails from './Component/EmployeeDetails';
import EditEmployee from './Component/EditEmployee';
import CreateEmployee from './Component/CreateEmployee';
import './App.css';

export class App extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <Router>
        <Switch>
          <Route exact path ={["/"]} component={Login}/>
          <Route exact path ="/home" component= {Home} />
          <Route exact path ="/profile:id" component={EmployeeProfile}/>
          <Route exact path ="/admin" component={EmployeeList}/>
          <Route path="/details/:id" component={ EmployeeDetails } />
          <Route path="/edit/:id" component={ EditEmployee } />
          <Route path="/create" component={Register} />
          <Route path="/register" component={CreateEmployee} />
        </Switch>
        </Router>
      </div>
    )
  }
}

export default App
