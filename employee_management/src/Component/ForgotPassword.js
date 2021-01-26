import React, { Component } from 'react'
import AuthService from '../Services/auth.service';
import swal from 'sweetalert';


export class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            Email:"",
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }
    changeEmailHandler =(event)=>{
        this.setState({Email: event.target.value.toLowerCase()});
    }

    checker=(e)=>{
 
        e.preventDefault();
        this.setState({
        emailError:"",
        },()=>{ 
            
        if(this.emailValidation(this.state.Email)===false){
            window.scrollTo(0,0);
            this.setState({emailError:"Please enter a valid email address"})
        }else
        if(this.emailValidation(this.state.Email)===true){
                    this.sendEmail();
            }
        })
    }
    emailValidation(email){
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        };

    sendEmail = () =>{
        let email=this.state.Email       
        AuthService.forgot(email).then(
            swal({
                title: "Success",
                text: "Email had been sent.",
                type: "success",
                }).then(
                    window.setTimeout('window.location.reload()', 3000)
                )
        )      
    }

    goBack = (e) =>{
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 col-md-offset-1">
                        <h1 className="Reset">Reset Your Password</h1>
                        <button type="submit" className="btn-lg btn-regoback" onClick={this.goBack}>Back</button>
                        <div className="alert alert-secondary" role="alert">
                        <p>We will send a reset password link to your email</p>
                    </div>
                <form>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" name="email" id="email"placeholder="Enter your e-mail" className="form-control"
                        value={this.state.Email}onChange={this.changeEmailHandler}required autofocus></input>
                        <small id="emaildHelp" class="text-danger">{this.state.emailError} </small>
                    </div>
                </form>
                <button disabled={!this.state.Email}  type="submit" onClick={this.checker}
                className="btn-lg btn-regoback btn-rounded float-right">Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword
