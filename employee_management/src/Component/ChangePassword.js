import React, { Component } from 'react';
import swal from 'sweetalert';
import AuthService from '../Services/auth.service';
import HttpService from '../Services/HttpService';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

export class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:JSON.parse(localStorage.getItem('user')).username,
            oldPassword:"",
            password:"",
            confirmPassword:"", 
            message: "",
            successful: false,
        }

        this.oldPasswordHandler = this.oldPasswordHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount(){
        HttpService.getEmployeeByName(this.state.username).then((res)=>{
            let employee=res.data;
            console.log(employee)
            this.setState({
                userName:employee.userName,
            })
        })
    }
    oldPasswordHandler =(event)=>{
        this.setState({oldPassword: event.target.value});
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
        message: "",
        successful: false,
        passwordError:"",
        confirmPasswordError:"",
        oldPasswordError:"",
        problems:0})
        this.form.validateAll();
        if(this.state.oldPassword===this.state.password){
            window.scrollTo(0,0);
            this.setState({passwordError:"New Password cannot same as old password. Please type another password",
            problems:1 })
        }

        if(this.state.password!==this.state.confirmPassword){
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
            this.setState({passwordError:"Your password must contain at least one letter, one digit and one special characters",
                           problems:1 })
        }
        if (this.state.password.search(/[0-9]/) < 0) {
            window.scrollTo(0,0);
            this.setState({passwordError:"Your password must contain at least one letter, one digit and one special characters",
                           problems:1 })
        }   
        if(this.state.password.search(/[?=.*[!@#\$%\^&\*]/) <0 ){
            window.scrollTo(0,0);
            this.setState({passwordError:"Your password must contain at least one letter, one digit and one special characters",
                           problems:1 })
        }   

        console.log(this.state.problems);
            if (this.checkBtn.context._errors.length === 0) {
            AuthService.checkPass(this.state.username,this.state.oldPassword).then(
              (response) => {
                this.setState({
                //   message: response.data.message,
                //   successful: true,
                });
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  successful: false,
                  message: resMessage,
                });
              }
            );
            if(this.state.problems===0){
                AuthService.changePass(this.state.username,this.state.password,this.state.oldPassword).then(
                    swal({
                        title: "Success",
                        text: "Password had been change.",
                        icon: "success",
                        button: "Ok",
                        }).then(
                        // window.setTimeout('window.location.reload()', 3000)
                    )
                )
            }
          }
    };

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

                        <Form
                            onSubmit={this.changePassword}
                            ref={(c) => {this.form = c;}}>
                            {!this.state.successful && (
                                <div >
                                <p>
                                    <input type="password" name="oldPassword" className="form-control"
                                    required autoFocus placeholder="Enter your old password"
                                    value={this.state.oldPassword} onChange={this.oldPasswordHandler}/>
                                    <small id="passwordHelp" className="text-danger">
                                    {this.state.oldPasswordError}{" "}
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div className={this.state.successful
                                                    ? "alert alert-success"
                                                    : "text-danger"
                                                }
                                                role="alert">
                                                {this.state.message}
                                            </div>
                                        </div>
                                    )}
                                    </small>  
                                </p>

                                <p>
                                    <input type="password" name="password" id="password" className="form-control"
                                    required placeholder="Enter your new password"
                                    value={this.state.password}onChange={this.changePasswordHandler}/>
                                    <small id="passwordHelp" className="text-danger">
                                    {this.state.passwordError}{" "}
                                    </small>
                                </p>

                                <p>
                                    <input type="password" name="confirmPassword" className="form-control"
                                    required placeholder="Confirm your new password"
                                    value={this.state.confirmPassword} onChange={this.confirmPasswordHandler}/>
                                    <small id="passwordHelp" className="text-danger">
                                    {this.state.confirmPasswordError}{" "}
                                    </small>
                                </p>
                                </div>
                            )}
                         
                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                this.checkBtn = c;}}/>
                        </Form>

                        <button disabled={!this.state.password || !this.state.confirmPassword || !this.state.oldPassword}  type="submit" onClick={this.changePassword}
                        className="btn-lg btn-regoback btn-rounded float-right">Save</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChangePassword
