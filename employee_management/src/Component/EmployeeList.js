import React, { Component } from 'react';
import HttpService from '../Services/HttpService';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DetailsIcon from '@material-ui/icons/Details';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import '../App.css';
export class EmployeeList extends Component {
    
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
    HttpService.getActiveUser().then((res)=>{
        this.setState({employees:res.data});
    });
    
}

OnDelete(item){
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
        active:0,
        softDelete:1};
        console.log(employee)

  HttpService.putSoftDelete(employee,item.id).then(window.location.reload() )
}

OnEdit(id){
    this.props.history.push(`/edit/${id}`);
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
goDeleted=(e)=>{
    e.preventDefault();
    this.props.history.push(`/softdelete`);
}
    render(){
        return(
            
            <div className="list-form">
                    <Button  variant="contained" onClick={this.goCreate} color="primary" type="submit"><AddIcon/>Create</Button>
                    <Button className="float-right" variant="contained" onClick={this.goDeleted} color="primary" type="submit">Deleted</Button>
                    
                <h2 className="text-center">Employee List</h2>
                <div className="search-form form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                    <TextField id="standard-search" placeholder="Enter Name" type="search" value={this.state.searchId} onChange={this.changeSearchHandler} />
                    {/* <input placeholder="Enter Name" name="name" className="form-control"
                                    value={this.state.searchId} onChange={this.changeSearchHandler}></input> */}
                    <button type="button" onClick={this.onSearch} className="btn btn-primary">Search</button>
                    <Button className="float-right" variant="contained" onClick={this.OnClear} color="primary" type="submit">Reset</Button>
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
                                    <td><Tooltip title="Details"><Button  id="iconbutton" variant="contained" onClick={()=>this.OnDetails(item.id)} color="primary" type="submit"><DetailsIcon/></Button></Tooltip>
                                    <Tooltip title="Edit"><Button id="iconbutton" variant="contained" onClick={()=>this.OnEdit(item.id)} color="primary" type="submit"><EditIcon/></Button></Tooltip>
                                    <Tooltip title="Delete"><Button  id="iconbutton" variant="contained" onClick={()=>window.confirm("Are you sure you wish to delete this item?") && this.OnDelete(item)} color="secondary" type="submit"><DeleteIcon/></Button></Tooltip>
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
export default EmployeeList
