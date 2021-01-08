import React, { Component } from 'react';
import HttpService from '../Services/HttpService';
export class EmployeeProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            readOnly:true,
            id:"id",
            name:"name",
            username:JSON.parse(localStorage.getItem('user')).username,
            EmployeeId:"employeeid",
            Department:"department",
            Email:"email",
            Position:"position",
            Superior:"superior",
            PhoneNo:"phone no",
            ExperienceYear:"experience",
            OfficeLocation:"location",
            Address:"address",
            DOB:"dob",
            DateJoined:"date",
            active:"",
            softDelete:"",
            photo:""
        }
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this._click = this._click.bind(this);
        this._cancel = this._cancel.bind(this);
        console.log("employee:",+this.state.employee)
    }

    componentDidMount(){
        HttpService.getEmployeeByName(this.state.username).then((res)=>{
            let employee=res.data[0];
            console.log(employee)
            this.setState({
                id:employee.id,
                name:employee.name,
                EmployeeId:employee.employeeId,
                Department:employee.department,
                Email:employee.email,
                Position:employee.position,
                Superior:employee.superior,
                PhoneNo:employee.contactNumber,
                ExperienceYear:employee.experienceYears,
                OfficeLocation:employee.officeLocation,
                Address:employee.address,
                DOB:employee.dob,
                DateJoined:employee.dateJoined,
                active:employee.active,
                softDelete:employee.softDelete,
                photo: employee.photo
            })
        }
        )
    }
    
    changePhoneHandler =(event)=>{
        this.setState({PhoneNo: event.target.value});
    }

    changeAddressHandler =(event)=>{
        this.setState({Address: event.target.value});
    }

    _click =(e)=>{
        e.preventDefault();
        this.setState(prevState => ({readOnly: !prevState.readOnly}));
    }
    
    _cancel =(e)=>{
        e.preventDefault();
        this.setState(prevState => ({readOnly: !prevState.readOnly}));
    }

    saveEmployee = (e) =>{
        e.preventDefault();
        let employee = {
            id:this.state.id,
            name:this.state.name, 
            employeeId:this.state.EmployeeId,
            department:this.state.Department,
            email:this.state.Email,
            position:this.state.Position,
            superior:this.state.Superior,
            contactNumber:this.state.PhoneNo,
            experienceYears:this.state.ExperienceYear,
            officeLocation:this.state.OfficeLocation,
            address:this.state.Address,
            dob:this.state.DOB,
            dateJoined:this.state.DateJoined,
            userName:this.state.username,
            active:this.state.active,
            softDelete:this.state.softDelete,
            photo:this.state.photo};
        HttpService.createEmployee(employee).then(res =>{
            this.props.history.push('/profile');
            this.setState(prevState => ({readOnly: !prevState.readOnly}));
        })
    }


    render(){
        return(
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Profile</h3>
                        <div className="card-body">
                            <form>
                                <div className="img-holder">
                                    <img src={this.state.photo ||'http://ky.myacpa.org/wp-content/uploads/2019/10/blank-profile-picture-coming-soon.png'}
                                    alt="Profile_Picture" className="img"/>
                                    <br /> 
                                </div>

                                <div className="form-group">
                                    <label>Name:</label>
                                    <input placeholder="Name" name="name" className="form-control"
                                    value={this.state.name} readOnly ></input>
                                </div>
                                <div className="form-group">
                                    <label>Employee Id:</label>
                                    <input placeholder="Employee Id" name="name" className="form-control"
                                    value={this.state.EmployeeId} readOnly ></input>
                                </div>
                                <div className="form-group">
                                    <label>Department:</label>
                                    <input placeholder="Department" name="department" className="form-control"
                                    value={this.state.Department} readOnly  ></input>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input placeholder="Email" name="email" className="form-control"
                                    value={this.state.Email} readOnly  ></input>
                                </div>
                                <div className="form-group">
                                    <label>Position:</label>
                                    <input placeholder="Position" name="position" className="form-control"
                                    value={this.state.Position} readOnly ></input>
                                </div>
                                <div className="form-group">
                                    <label>Superior:</label>
                                    <input placeholder="Superior" name="superior" className="form-control"
                                    value={this.state.Superior} readOnly ></input>
                                </div>
                                <div className="form-group">
                                    <label>Phone No.:</label>
                                    <input placeholder="Phone No." name="phone" className="form-control"
                                    value={this.state.PhoneNo} onChange={this.changePhoneHandler} readOnly={this.state.readOnly}></input>
                                </div>
                                <div className="form-group">
                                    <label>Experience Years:</label>
                                    <input placeholder="Experience Year" name="phone" className="form-control"
                                    value={this.state.ExperienceYear} readOnly ></input>
                                </div>
                                <div className="form-group">
                                    <label>Office Location:</label>
                                    <input placeholder="Office Location" name="phone" className="form-control"
                                    value={this.state.OfficeLocation} readOnly ></input>
                                </div>
                                <div className="form-group">
                                    <label>Address:</label>
                                    <textarea rows="3" placeholder="Address" name="phone" className="form-control"
                                    value={this.state.Address}  onChange={this.changeAddressHandler} readOnly={this.state.readOnly}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth:</label>
                                    <input placeholder="DD/MM/YYYY" name="phone" className="form-control"
                                    value={this.state.DOB} readOnly ></input>
                                </div>
                                <div className="form-group">
                                    <label>Date Joined:</label>
                                    <input placeholder="DD/MM/YYYY" name="phone" className="form-control"
                                    value={this.state.DateJoined} readOnly ></input>
                                </div>
                                <button className="btn float-left" hidden={!this.state.readOnly} onClick={this._click}>Edit</button>
                                <button className="btn float-left" hidden={this.state.readOnly} onClick={this._cancel}>Cancel</button>
                                <button className="btn float-right btn-info" hidden={this.state.readOnly} onClick={this.saveEmployee}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
}

export default EmployeeProfile
