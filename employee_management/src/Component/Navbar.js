import React, { Component } from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export class Navbar extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      isHidden:true,
      username:""
    };
    this.logout=this.logout.bind(this);
}

componentDidMount(){
  if( localStorage.getItem('user')!=null){
    this.setState({isHidden:false,
      username:JSON.parse(localStorage.getItem('user')).username})
  }
}
  logout(){
    this.setState({isHidden:true})
    localStorage.removeItem("user");
  }
  render() {
    return (
          <nav className="navbar navbar-expand-md navbar-dark bg-dark " >
              <div className="navbar-header">
                <p className="navbar-brand">Employee Management</p>
              </div>

                  {/* <li ><NavLink  className="nav-menu__link" activeClassName="activate" exact to="/home">Home</NavLink></li>
                  <li ><NavLink className="nav-menu__link" activeClassName="activate" exact to="/create">Create</NavLink></li> */}
                  <form className="form-inline my-2 my-lg-0 ml-auto">
                    
                       {/* <button hidden={this.state.isHidden} className="btn btn-outline-success my-2 my-sm-0"  type="submit"><NavLink onClick={this.logout} className="nav-menu__link" activeClassName="activate" exact to="/">Logout</NavLink></button> */}
                       <Dropdown >
                        <Dropdown.Toggle className="dropdown" hidden={this.state.isHidden} variant="dark" id="dropdown-basic">
                        <p hidden = {this.state.isHidden} className="navbar-brand nav-name">Hi, {this.state.username}</p> 
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                          <Dropdown.Item href="change_password">Change Password</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item hidden={this.state.isHidden} href="#/action-2"> <NavLink onClick={this.logout} className="nav-menu__link" activeClassName="activate" exact to="/">Logout</NavLink></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                  </form>
          </nav>
    )
  }
}
export default Navbar;