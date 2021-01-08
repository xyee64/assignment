import React, { Component } from "react";
import authService from "../Services/auth.service";
 
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      password: "",
    };
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
  }
 
  changePasswordHandler = (e) => {
    this.setState({ password: e.target.value });
  };
 
  savePassword = (e) => {
    e.preventDefault();
 
    let token = this.state.token;
    let password = this.state.password;
    authService.resetPassword(token, password);
  };
 
  render() {
    return (
      <div>
        <div>
          <h2 className="text-center">Forgot Password</h2>
        </div>
 
        <form style={{ width: "420px", margin: "0 auto" }}>
          <div className="border border-secondary rounded p-3">
            <div>
              <p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  required
                  autofocus
                  placeholder="Enter your new password"
                  value={this.state.password}
                  onChange={this.changePasswordHandler}
                />
              </p>
 
              {/* <p>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  required
                  autofocus
                  placeholder="Enter your new password"
                  //onInput="checkPasswordMatch(this);"
                  value={this.state.password}
                  onChange={this.changePasswordHandler}
                />
              </p> */}
 
              <p className="text-center">
                <button className="btn btn-success" onClick={this.savePassword}>
                  Save
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
 
export default ResetPassword;