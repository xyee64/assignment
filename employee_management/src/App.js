import React, { Component } from 'react';
import Login from './Component/Login';
import { Switch,  BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Component/Home';
import EmployeeProfile from './Component/EmployeeProfile';
import EmployeeList from './Component/EmployeeList';
import EmployeeDetails from './Component/EmployeeDetails';
import EditEmployee from './Component/EditEmployee';
import CreateEmployee from './Component/CreateEmployee';
import Navbar from './Component/Navbar';
import SoftDelete from './Component/SoftDelete';
import ForgotPassword from './Component/ForgotPassword';
import ChangePassword from './Component/ChangePassword';
import './App.css';
import ResetPassword from './Component/ResetPassword';

export class App extends Component {

  constructor(props){
    super(props)
    this.state= {
      values:[]
    }
  }


  // componentDidMount(){
  //   if(localStorage.getItem('user')!=null){
  //     setTimeout(this.alertFunc, 600000);
  //   }
  // }

  // alertFunc() {
  //   localStorage.removeItem("user")
  //   console.log("Hello!");
  //   window.location.href="/"
  // }
  
  render() {
    return (
        <Router>
          <Navbar/>
          <div className="container-fluid">
        <Switch>
          <Route exact path ={["/"]} component={Login}/>
          <Route exact path ="/home" component= {Home} />
          <Route path ="/profile" component={EmployeeProfile}/>
          <Route exact path ="/admin" component={EmployeeList}/>
          <Route path ="/softdelete" component={SoftDelete}/>
          <Route path="/details/:id" component={ EmployeeDetails } />
          <Route path="/edit/:id" component={ EditEmployee } />
          <Route path="/register" component={CreateEmployee} />
          <Route path="/forgot_password" component={ForgotPassword}/>
          <Route path="/change_password" component={ChangePassword}/>
          <Route path="/reset_password/" component={ResetPassword}/>
        </Switch>
        </div>
        </Router>
    )
  }
}

export default App
