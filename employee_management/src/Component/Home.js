import React, { Component } from 'react';
import AuthService from '../Services/auth.service';
import { Link } from 'react-router-dom';


export class Home extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            showAdminBoard: false,
            createEmployee: false,
           currentUser: undefined,
        };
    }
    
    componentDidMount(){
        const user = AuthService.getCurrentUser();

        if (user){
            this.setState({
                currentUser: user,
                showAdminBoard:user.roles.includes("ADMIN"),
                createEmployee:user.roles.includes("ADMIN"),
                register:user.roles.includes("ADMIN"),
            });
        }
    }

    logout(){
        AuthService.logout();
    }

    render() {
        const{currentUser, showAdminBoard,createEmployee} = this.state;
        return (
            <div>
                <nav className = "navbar navbar-expand navbar-dark bg-dark">
                    <Link to ={"/"} className="navbar-brand">
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {/* <Link to ={"/profile"} className="nav-link">
                                Home
                            </Link> */}
                        </li>

                        {showAdminBoard &&(
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>                               
                            </li>
                        )}

                        {createEmployee &&(
                            <li className="nav-item">
                                <Link to= {"/register"} className="nav-link">
                                    Create
                                </Link>
                            </li>
                        )}

                
                        {currentUser &&(
                            <li className="nav-item">
                                <Link to={"/profile/:id"} className="nav-link">
                                    Edit
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser && ( 
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to = {"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link" onClick={this.logout}>
                                    Logout
                                </a>
                            </li>
                        </div>
                    )}
                </nav>
            </div>
        );
    }
}

export default Home
