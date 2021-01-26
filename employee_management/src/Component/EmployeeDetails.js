import React, { Component } from 'react';
import HttpService from '../Services/HttpService';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
            DateJoined:"",
            username:"",
            photo:"",
            attachment:"",
            attachmentName:"",
            edittedBy:"",
            createdBy:""
        }
    }

    componentDidMount(){
        if(JSON.parse(localStorage.getItem('user'))===null){
            this.props.history.push(`/`);
        }
        if(JSON.parse(localStorage.getItem('user'))!==null){
            if(JSON.parse(localStorage.getItem('user')).roles[0]!=="ADMIN"){
                this.props.history.push(`/profile`);
            }
        }
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
                username:employee.userName,
                photo:employee.photo,
                attachment:employee.attachment,
                createdBy:employee.createdBy,
                edittedBy:employee.edittedBy,
                attachmentName:employee.attachmentName
            })
        }
        )
    }

    goBack = (e) =>{
        e.preventDefault();
        this.props.history.goBack();
    }

    getAttachment() {
        const filePreviewOption = {
          followCursor: false,
          shiftX: 20,
          shiftY: 0,
        };
     
        if (this.state.id === "add") {
          return;
        } else {
          if (!this.state.attachment) {
            return;
          } else {
            const downloadLink = [];
            for (const [index, value] of this.state.attachment
              .split(",")
              .entries()) {
              const initial = value
                .split(RegExp("%2..*%2F(.*?)alt"))[1]
                .split(".")[0];
              const fileName = initial.replaceAll("%20", " ");
              downloadLink.push(
                <li style={{ marginBottom: "5px" }} key={index}>
                    <a href={value}>{fileName}</a>
                </li>
                // <ReactHover options={filePreviewOption}>
                //   <Trigger type="trigger">
                //     <li style={{ marginBottom: "5px" }} key={index}>
                //       <a href={value}>{fileName}</a>
                //     </li>
                //   </Trigger>
                //   <Hover type="hover">
                //     <div>
                //       <iframe
                //         src={value}
                //         title="File Preview"
                //         style={{ width: "500px", height: "300px" }}
                //       />
                //       {/* <embed src={value} height="" width=""></embed> */}
                //     </div>
                //   </Hover>
                // </ReactHover>
              );
            }
            return downloadLink;
          }
        }
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
                                <div className="img-holder">
                                    <img src={this.state.photo ||'http://ky.myacpa.org/wp-content/uploads/2019/10/blank-profile-picture-coming-soon.png'}
                                    alt="Profile_Picture" className="img"/>
                                    <br /> 
                                </div>

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
                                    <label>Username:</label>
                                    <input placeholder="Username" name="username" className="form-control"
                                    value={this.state.username} onChange={this.changeNameHandler} readOnly></input>
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
                                <div className="form-group">
                                    <label>Created By: {this.state.createdBy}</label>
                                </div>
                                <div className="form-group">
                                    <label>Editted By: {this.state.edittedBy}</label>
                                </div>

                                <div>
                                <Accordion defaultActiveKey="1" >
                                    <Card >
                                        <Accordion.Toggle as={Card.Header} collapse eventKey="0" className="List_A text-white bg-dark" >
                                        List of Attachment
                                        <i class ="	fa fa-file-text float-left" style={{paddingRight:"10px"}}></i>
                                        <i class="fa fa-chevron-down float-right" ></i>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>{this.getAttachment()}</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                </div>
                                <br/>
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
