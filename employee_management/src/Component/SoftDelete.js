import React, { Component } from 'react';
import HttpService from '../Services/HttpService';
import TextField from '@material-ui/core/TextField';
import '../App.css';
export class SoftDelete extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            employees:[],
            search:""
        }
        this.OnDelete= this.OnDelete.bind(this)
        this.onSearch=this.onSearch.bind(this);
        this.OnDetails=this.OnDetails.bind(this);
    }

componentDidMount(){
    HttpService.getSoftDeleteUser().then((res)=>{
        this.setState({employees:res.data});
        console.log(res.data)
    });
    
}

OnDelete(item){
    let employee = {
        name:item.name, 
        employeeId:item.employeeId,
        department:item.department,
        email:item.email,
        position:item.position,
        superior:item.superior,
        contactNumber:item.contactNumber,
        experienceYears:item.experienceYears,
        officeLocation:item.officeLocation,
        address:item.address,
        dob:item.dob,
        dateJoined:item.dateJoined,
        userName:item.userName};
    
    HttpService.HardDeleteUser(employee);
    HttpService.deleteEmployee(item.id);
    window.location.reload() 
}

OnRestore(item){
    let employee = {
        id:item.id,
        name:item.name, 
        employeeId:item.employeeId,
        department:item.department,
        email:item.email,
        position:item.position,
        superior:item.superior,
        contactNumber:item.contactNumber,
        experienceYears:item.experienceYears,
        officeLocation:item.officeLocation,
        address:item.address,
        dob:item.dob,
        dateJoined:item.dateJoined,
        userName:item.userName,
        active:1,
        softDelete:0};
        this.setState({employees:[]})
  HttpService.putSoftDelete(employee,item.id).then(
    HttpService.getSoftDeleteUser().then((res)=>{
        this.setState({employees:res.data});
        window.location.reload() 
    })
  );
}

OnDetails(id){
    this.props.history.push(`/details/${id}`);
}
changeSearchHandler=(event)=>{
    this.setState({search:event.target.value});
}

onSearch=(e)=>{
    e.preventDefault();
    if(this.state.search!==""){
        HttpService.getEmployeeByuserName(this.state.search).then((res)=>{
            this.setState({employees:res.data});
        });
    }else{
        HttpService.getActiveUser().then((res)=>{
            this.setState({employees:res.data});
        });
    }
}

OnClear=(e)=>{
    HttpService.getActiveUser().then((res)=>{
        this.setState({employees:res.data});
    });
}

goCreate=(e)=>{
    e.preventDefault();
    this.props.history.push(`/register`);
}
    render(){
        return(
            
            <div className="list-form">
                <h2 className="text-center">Soft Deleted</h2>
                <div className="search-form form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                    <TextField id="standard-search" placeholder="Enter Name" type="search" value={this.state.searchId} onChange={this.changeSearchHandler} />
                    {/* <input placeholder="Enter Name" name="name" className="form-control"
                                    value={this.state.searchId} onChange={this.changeSearchHandler}></input> */}
                    <button type="button" onClick={this.onSearch} className="btn btn-primary">Search</button>
                </div>
                <div className = "row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Phone No.</th>
                                <th>Superior</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                              this.state.employees.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.department}</td>
                                    <td>{item.email}</td>
                                    <td>{item.position}</td>
                                    <td>{item.contactNumber}</td>
                                    <td>{item.superior}</td>
                                    <td><button type="button" onClick={()=>this.OnDetails(item.id)} className="btn btn-primary">Details</button>
                                    <button type="button" className="btn btn-danger" onClick={()=>window.confirm("Are you sure you wish to delete this item?") && this.OnDelete(item)}>Delete</button>
                                    <button type="button" className="btn btn-danger" onClick={()=>window.confirm("Are you sure you wish to restore this item?") && this.OnRestore(item)}>Retore</button>
                                    </td>
                                </tr>
                              ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default SoftDelete;