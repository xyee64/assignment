import React, { Component } from 'react';
import HttpService from '../Services/HttpService';

export class EmployeeList extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees:[]
        }
        this.OnDelete= this.OnDelete.bind(this)
    }

componentDidMount(){
    HttpService.getEmployees().then((res)=>{
        this.setState({employees:res.data});
        console.log(res.data)
    });
    
}

OnDelete(id){
 console.log("this is "+id);
 HttpService.deleteEmployee(id);
 this.props.history.push('/home');
}

OnEdit(id){
    this.props.history.push(`/edit/${id}`);
}
   OnDetails(id){
    this.props.history.push(`/details/${id}`);
}

goback = e =>{
    e.preventDefault();
    this.props.prevStep();
}

    render(){
        return(
            <div className="list-form container List-con">
                <h2 className="text-center">Employee List</h2>
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
                                    <td>{item.eMail}</td>
                                    <td>{item.position}</td>
                                    <td>{item.contactNumber}</td>
                                    <td>{item.superior}</td>
                                    <td><button type="button" onClick={()=>this.OnDetails(item.id)} className="btn btn-primary">details</button>
                                    <button type="button" onClick={()=>this.OnEdit(item.id)} className="btn btn-primary">edit</button>
                                    <button type="button" className="btn btn-danger" onClick={()=>window.confirm("Are you sure you wish to delete this item?") && this.OnDelete(item.id)}>delete</button>
                                    </td>
                                </tr>
                              ))


                            }
                        </tbody>
                    </table>
                    <button type ="button" className="btn btn-danger" onClick={this.goback}> Back </button>
                </div>
            </div>
        )
    }
}
export default EmployeeList
