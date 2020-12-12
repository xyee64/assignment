import React, { Component } from 'react';
import HttpService from '../Services/HttpService';

export class EmployeeDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            name:"",
            EmployeeId:"",
            Department:"",
            Email:"",
            Position:"",
            Superior:"",
            PhoneNo:"",
            ExperienceYear:"",
            OfficeLocation:"",
            Address:"",
            DOB:"",
            DateJoined:""
        }
    }

    componentDidMount(){
        console.log(this.state.id)
        HttpService.getEmployeeById(this.state.id).then((res)=>{
            let employee=res.data;
            this.setState({
                name:employee.name,
                EmployeeId:employee.employeeId,
                Department:employee.department,
                Email:employee.eMail,
                Position:employee.position,
                Superior:employee.superior,
                PhoneNo:employee.contactNumber,
                ExperienceYear:employee.experienceYears,
                OfficeLocation:employee.officeLocation,
                Address:employee.address,
                DOB:employee.dob,
                DateJoined:employee.dateJoined
            })
        }
        )
    }

    goBack = (e) =>{
        e.preventDefault();
        this.props.history.push('/admin');
    }


    render(){
        return(
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">{this.state.name}</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input placeholder="Name" name="name" className="form-control"
                                    value={this.state.name} onChange={this.changeNameHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Employee Id:</label>
                                    <input placeholder="Employee Id" name="name" className="form-control"
                                    value={this.state.EmployeeId} onChange={this.changeEmployeeIdHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Department:</label>
                                    <input placeholder="Department" name="department" className="form-control"
                                    value={this.state.Department} onChange={this.changeDepartmentHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input placeholder="Email" name="email" className="form-control"
                                    value={this.state.Email} onChange={this.changeEmailHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Position:</label>
                                    <input placeholder="Position" name="position" className="form-control"
                                    value={this.state.Position} onChange={this.changePositionHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Superior:</label>
                                    <input placeholder="Superior" name="superior" className="form-control"
                                    value={this.state.Superior} onChange={this.changeSuperiorHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Phone No.:</label>
                                    <input placeholder="Phone No." name="phone" className="form-control"
                                    value={this.state.PhoneNo} onChange={this.changePhoneHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Experience Years:</label>
                                    <input placeholder="Experience Year" name="phone" className="form-control"
                                    value={this.state.ExperienceYear} onChange={this.changeExperienceYearHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Office Location:</label>
                                    <input placeholder="Office Location" name="phone" className="form-control"
                                    value={this.state.OfficeLocation} onChange={this.changeOfficeLocationHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Address:</label>
                                    <textarea rows="3" placeholder="Address" name="phone" className="form-control"
                                    value={this.state.Address} onChange={this.changeAddressHandler} readOnly></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth:</label>
                                    <input placeholder="DD/MM/YYYY" name="phone" className="form-control"
                                    value={this.state.DOB} onChange={this.changeDOBHandler} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label>Date Joined:</label>
                                    <input placeholder="DD/MM/YYYY" name="phone" className="form-control"
                                    value={this.state.DateJoined} onChange={this.changeDateJoinedHandler} readOnly></input>
                                </div>
                                <button className="btn btn-primary float-right" onClick={this.goBack}>Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
}

export default EmployeeDetails
