import React, { Component } from 'react';
import HttpService from '../Services/HttpService';
import TextField from '@material-ui/core/TextField';

class EditEmployee extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            name:"",
            userName:"",
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
            DateJoined:"",
            active:"",
            softDelete:""
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmployeeIdHandler = this.changeEmployeeIdHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.changeSuperiorHandler = this.changeSuperiorHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeExperienceYearHandler = this.changeExperienceYearHandler.bind(this);
        this.changeOfficeLocationHandler = this.changeOfficeLocationHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDOBHandler = this.changeDOBHandler.bind(this);
        this.changeDateJoinedHandler = this.changeDateJoinedHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount(){
        this.dateLock()
        HttpService.getEmployeeById(this.state.id).then((res)=>{
            let employee=res.data;
            this.setState({
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
                userName:employee.userName,
                active:employee.active,
                softDelete:employee.softDelete
            })
        }
        )
    }
    
    changeNameHandler =(event)=>{
        this.setState({name: event.target.value});
    }
    changeEmployeeIdHandler =(event)=>{
        this.setState({EmployeeId: event.target.value});
    }
    changeDepartmentHandler =(event)=>{
        this.setState({Department: event.target.value});
    }
    changeEmailHandler =(event)=>{
        this.setState({Email: event.target.value});
    }
    changePositionHandler =(event)=>{
        this.setState({Position: event.target.value});
    }
    changeSuperiorHandler =(event)=>{
        this.setState({Superior: event.target.value});
    }
    changePhoneHandler =(event)=>{
        this.setState({PhoneNo: event.target.value});
    }
    changeExperienceYearHandler =(event)=>{
        this.setState({ExperienceYear: event.target.value});
    }
    changeOfficeLocationHandler =(event)=>{
        this.setState({OfficeLocation: event.target.value});
    }
    changeAddressHandler =(event)=>{
        this.setState({Address: event.target.value});
    }
    changeDOBHandler =(event)=>{
        this.setState({DOB: event.target.value});
    }
    changeDateJoinedHandler =(event)=>{
        this.setState({DateJoined: event.target.value});
    }
    changeUsernameHandler =(event)=>{
        this.setState({userName: event.target.value});
    }

    dateLock =()=>{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 

        today = yyyy+'-'+mm+'-'+dd;
        document.getElementById("datefield").setAttribute("max", today);
    }

    goBack = (e) =>{
        e.preventDefault();
        this.props.history.push('/admin');
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
            userName:this.state.userName,
            active:this.state.active,
            softDelete:this.state.softDelete};

        HttpService.createEmployee(employee).then(res =>{
            this.props.history.push('/admin');
        })
    }


    render(){
        return(
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Edit Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input placeholder="Name" name="name" className="form-control"
                                    value={this.state.name} onChange={this.changeNameHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Employee Id:</label>
                                    <input placeholder="Employee Id" name="name" className="form-control"
                                    value={this.state.EmployeeId} onChange={this.changeEmployeeIdHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Department:</label>
                                    <input placeholder="Department" name="department" className="form-control"
                                    value={this.state.Department} onChange={this.changeDepartmentHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input placeholder="Email" name="email" className="form-control"
                                    value={this.state.Email} onChange={this.changeEmailHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Position:</label>
                                    <input placeholder="Position" name="position" className="form-control"
                                    value={this.state.Position} onChange={this.changePositionHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Superior:</label>
                                    <input placeholder="Superior" name="superior" className="form-control"
                                    value={this.state.Superior} onChange={this.changeSuperiorHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Phone No.:</label>
                                    <input placeholder="Phone No." name="phone" className="form-control"
                                    value={this.state.PhoneNo} onChange={this.changePhoneHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Experience Years:</label>
                                    <input placeholder="Experience Year" name="phone" className="form-control"
                                    value={this.state.ExperienceYear} onChange={this.changeExperienceYearHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Office Location:</label>
                                    <input placeholder="Office Location" name="phone" className="form-control"
                                    value={this.state.OfficeLocation} onChange={this.changeOfficeLocationHandler}></input>
                                </div>
                                <div className="form-group">
                                    <label>Address:</label>
                                    <textarea rows="3" placeholder="Address" name="phone" className="form-control"
                                    value={this.state.Address} onChange={this.changeAddressHandler}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth: </label>
                                    <TextField id="datefield"  type="date" value={this.state.DOB} onChange={this.changeDOBHandler} InputLabelProps={{shrink: true,}}/>
                                </div>


                                <div className="form-group">
                                    <label>Date Joined: </label>
                                    <TextField id="datefield"  type="date" value={this.state.DateJoined} onChange={this.changeDateJoinedHandler} InputLabelProps={{shrink: true,}}/>
                                </div>
                                <button className="btn float-left" onClick={this.goBack}>Cancel</button>
                                <button className="btn float-right btn-info" onClick={this.saveEmployee}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
}

export default EditEmployee