import React, { Component } from 'react';
import swal from 'sweetalert';
import AuthService from '../Services/auth.service';
import HttpService from '../Services/HttpService';

export class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:JSON.parse(localStorage.getItem('user')).username,
            password:"",
            confirmPassword:"",
        }

        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount(){
        HttpService.getEmployeeByName(this.state.username).then((res)=>{
            let employee=res.data;
            this.setState({
                userName:employee.userName,
            })
        })
    }
    changePasswordHandler =(event)=>{
        this.setState({password: event.target.value});
    }
    confirmPasswordHandler =(event)=>{
        this.setState({confirmPassword: event.target.value});
    }

    changePassword=(e)=>{
        e.preventDefault();
        this.setState({
        passwordError:"",
        confirmPasswordError:"",
        problems:0})

        if (this.state.password===""){
            window.scrollTo(0,0);
            this.setState({passwordError:"Please enter a valid password",
            problems:1 })
        }

        if (this.state.confirmPassword===""){
            window.scrollTo(0,0);
            this.setState({confirmPasswordError:"Please enter a valid password",
            problems:1 })
        }

        if(this.state.password!=this.state.confirmPassword){
            window.scrollTo(0,0);
            this.setState({confirmPasswordError:"Password not match",
                           problems:1 })
        }

        if(this.state.password.length<8){
            window.scrollTo(0,0);
            this.setState({passwordError:"Password length must be atleast 8 characters",
                           problems:1 })
        }  
        if (this.state.password.search(/[a-z]/i) < 0) {
            window.scrollTo(0,0);
            this.setState({passwordError:"Your password must contain at least one letter",
                           problems:1 })
        }
        if (this.state.password.search(/[0-9]/) < 0) {
            window.scrollTo(0,0);
            this.setState({passwordError:"Your password must contain at least one digit",
                           problems:1 })
        }   
        if(this.state.password.search(/[?=.*[!@#\$%\^&\*]/) <0 ){
            window.scrollTo(0,0);
            this.setState({passwordError:"Your password must contain at least one special characters",
                           problems:1 })
        }   

        console.log(this.state.problems)
        if(this.state.problems===0){
            //  this.changePassword();
            AuthService.changePass(this.state.username,this.state.password).then(
                swal({
                   title: "Success",
                   text: "Password had been change.",
                   icon: "success",
                   button: "Ok",
                   }).then(
                    window.setTimeout('window.location.reload()', 3000)
                )
            )
        }
    }

    goBack = (e) =>{
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-6 col-md-offset-1">
                        <h1 className="Reset">Change Your Password [{this.state.username}]</h1>
                        <button type="submit" className="btn-lg btn-regoback" onClick={this.goBack}>Back</button>
                <form>

                    <div className="form-group">
                        <input type="text" name="username-chg" id="username-chg"placeholder="username" className="form-control"
                        value={this.state.username}readOnly ></input>
                    </div>

                    <div className="form-group">
                        <label>New Password:</label>
                        <input type="text" name="password" type="password" id="password" placeholder="Enter your new password" className="form-control"
                        value={this.state.password} onChange={this.changePasswordHandler}></input>
                        <small id="passwordHelp" class="text-danger">{this.state.passwordError} </small>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="text" name="confirmPassword" type="password" id="password"placeholder="Confirm your new password" className="form-control"
                        value={this.state.confirmPassword} onChange={this.confirmPasswordHandler}></input>
                        <small id="passwordHelp" class="text-danger">{this.state.confirmPasswordError} </small>
                    </div>
                </form>

                <button disabled={!this.state.password && !this.state.confirmPassword}  type="submit" onClick={this.changePassword}
                className="btn-lg btn-regoback btn-rounded float-right">Save</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChangePassword
