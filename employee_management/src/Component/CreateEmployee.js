import React, { Component } from 'react';
import HttpService from '../Services/HttpService';
import AuthService from '../Services/auth.service';
import TextField from '@material-ui/core/TextField';
import "react-datepicker/dist/react-datepicker.css";
import {storage} from '../firebase';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class CreateEmployee extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            name:"",
            username:"",
            password:"",
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
            usernameError:"",
            passwordError:"",
            nameError:"",
            emailError:"",
            experienceError:"",
            employeeError:"",
            problems:"",
            photo:"",
            attachment:"",
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
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePhotoHandler = this.changePhoneHandler.bind(this);
        this.changeAttachmentHandler = this.changeAttachmentHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.checker= this.checker.bind(this);
        this.emailValidation= this.emailValidation.bind(this);
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
        this.dateLock()
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
        this.setState({Email: event.target.value.toLowerCase()});
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
        console.log(this.state.DOB);
    }
    changeDateJoinedHandler =(event)=>{
        this.setState({DateJoined: event.target.value});
    }
    changePasswordHandler =(event)=>{
        this.setState({password: event.target.value});
    }
    changeUsernameHandler =(event)=>{
        this.setState({username: event.target.value.toLowerCase()});
    }
    changePhotoHandler =(event)=>{
        this.setState({phtoto: event.target.value});
    }
    changeAttachmentHandler =(event)=>{
        this.setState({attachment: event.target.value});
    }

    emailchecker(checklist){

        if(this.emailValidation(this.state.Email)===false){
            window.scrollTo(0,0);
            this.setState({emailError:"Please enter a valid email address",
                           problems:1 },()=>{this.usernamechecker(checklist)})
        }else

        if(this.emailValidation(this.state.Email)){
            HttpService.CheckMail(checklist).then(res =>{
                if(res.data==="Email Taken"){
                    this.setState({emailError:res.data,
                        problems:1 },()=>{this.usernamechecker(checklist)})
                }else
                {this.usernamechecker(checklist)}
            })
        }
    }
    usernamechecker(checklist){
        if(this.state.username===""){
            window.scrollTo(0,0);
            this.setState({usernameError:"Please enter a user name",
            problems:1 },()=>{this.namechecker(checklist)})
        }else
        if(this.state.username!==""){
            HttpService.CheckUsername(checklist).then(res =>{
                if(res.data==="Username Taken"){
                    this.setState({usernameError:res.data,
                        problems:1 },()=>{this.namechecker(checklist)})
                }else{this.namechecker(checklist)}
            })
        }
    }

    namechecker(checklist){
        if(this.state.name===""){
            window.scrollTo(0,0);
            this.setState({nameError:"Please enter a name",
            problems:1 },()=>{this.employeeidchecker(checklist)})
        }else{
            this.employeeidchecker(checklist);
        }
    }

    employeeidchecker(checklist){
        if(this.state.EmployeeId===""){
            window.scrollTo(0,0);
            this.setState({employeeError:"Please enter an Employee ID",
            problems:1 },()=>{this.passwordcheck()})
        }else      
        if(this.state.EmployeeId!==""){
            console.log("check")
            HttpService.CheckId(checklist).then(res =>{
                if(res.data==="ID already exist in the database"){
                    this.setState({employeeError:res.data,
                        problems:1 },()=>{this.passwordcheck()})
                }else{
                    this.passwordcheck();
                }
            })
        }
    }

    passwordcheck(){
        if (this.state.password===""){
            window.scrollTo(0,0);
            this.setState({passwordError:"Please enter a valid password",
            problems:1 },()=>{this.experiencecheck();})
        }else{
            this.experiencecheck();
        }
    }

    experiencecheck(){
        if (isNaN(this.state.ExperienceYear)) {
            this.setState({experienceError:"Please enter a number",
            problems:1 },()=>{this.problemcheck();})
        }else{
            this.problemcheck();
        }
    }

    problemcheck(){
        if(this.state.problems===0){
            this.saveEmployee();
       }
    }
    checker=(e)=>{
        let checklist={
            userName:this.state.username,
            email:this.state.Email,
            employeeId:this.state.EmployeeId
        }
        e.preventDefault();
        this.setState({usernameError:"",
        employeeError:"",
        nameError:"",
        passwordError:"",
        emailError:"",
        experienceError:"",
        problems:0},()=>{this.emailchecker(checklist);})

        
        //this.usernamechecker(checklist);
        //this.namechecker();
        ///this.employeeidchecker(checklist);
       // this.passwordcheck();
        //this.experiencecheck();
        //this.problemcheck();
    }

    emailValidation(email){
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        };

    saveEmployee = () =>{
        let employee = {
            name:this.state.name, 
            userName:this.state.username,
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
            photo:this.state.photo,
            attachment:this.state.attachment,
            createdBy:JSON.parse(localStorage.getItem('user')).username,
            active:1};
        let details = {
            username:this.state.username,
            password:this.state.password,
            email:this.state.Email
        };
        HttpService.createEmployeeTest(employee).then(

            AuthService.register(details).then(
                this.props.history.push('/admin')
            )
        )
    }
    goBack = (e) =>{
        e.preventDefault();
        this.props.history.push('/admin');
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
                    <button onClick={this.deleteAttachment} 
                    name={index}>remove</button>
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
        const uploadImage = (e) => {
            const image = e.target.files[0];
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // progress function ....
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
              },
              (error) => {
                // error function ....
                console.log(error);
              },
              () => {
                // complete function ....
                storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then((url) => {
                    console.log(url);
                    this.setState({ photo: url });
                  });
              }
            );
          };

          const uploadAttachment = (e) => {
            const attachment = e.target.files[0];
            const attachmentName = e.target.files[0].name;
            const uploadTask = storage.ref(`attachment/${attachmentName}`).put(attachment);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // progress function ....
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
              },
              (error) => {
                // error function ....
                console.log(error);
              },
              () => {
                // complete function ....
                this.setState({attachmentName:attachmentName})
                storage
                  .ref("attachment")
                  .child(attachmentName)
                  .getDownloadURL()
                  .then((url) => {
                    console.log(attachmentName)
                    console.log(url);
                    this.setState({ attachment: url });
                  });
              }
            );
          };
        return(
            <div>
                <div className="details-form">
                    
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="img-holder">
                                        <img src={this.state.photo || 'http://ky.myacpa.org/wp-content/uploads/2019/10/blank-profile-picture-coming-soon.png'}
                                        alt="Profile_Picture" className="img"/>
                                    </div>
                                        {/* <progress value={this.state.progress} max="100" /> */}
                                        {/* <br /> */}
                                        <input type="file" name="photo-upload"id="photo-upload" onChange={uploadImage} />
                                    <div className="upload-icon">
                                        <label htmlFor="photo-upload" className="photo-upload">
                                                <i className="material-icons">add_photo_alternate</i>
                                                Choose Your Photo
                                        </label>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input  id="validationCustom01" placeholder="Name"  className="form-control"
                                        value={this.state.name} onChange={this.changeNameHandler} ></input>
                                        <small id="passwordHelp" class="text-danger">{this.state.nameError} </small> 
                                    </div>


                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label>Username:</label>
                                            <input placeholder="Username"  className="form-control"
                                            value={this.state.Username} onChange={this.changeUsernameHandler} ></input>
                                            <small id="passwordHelp" class="text-danger">{this.state.usernameError} </small> 
                                    </div>
                                        
                                    <div className="form-group col-md-6">
                                            <label>Password:</label>
                                            <input placeholder="Password" type="password" className="form-control"
                                            value={this.state.Password} onChange={this.changePasswordHandler} ></input>
                                            <small id="passwordHelp" class="text-danger">{this.state.passwordError} </small>
                                    </div>
                                    </div>
                                    

                                    <div className="form-group">
                                        <label>Employee Id:</label>
                                        <input placeholder="Employee Id"  className="form-control"
                                        value={this.state.EmployeeId} onChange={this.changeEmployeeIdHandler} ></input>
                                        <small id="passwordHelp" class="text-danger">{this.state.employeeError} </small>
                                    </div>


                                    <div className="form-group">
                                        <label>Department:</label>
                                        <input placeholder="Department" className="form-control"
                                        value={this.state.Department} onChange={this.changeDepartmentHandler} ></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email"  placeholder="Email" className="form-control"
                                        value={this.state.Email} onChange={this.changeEmailHandler} ></input>
                                        <small id="passwordHelp" class="text-danger">{this.state.emailError} </small>
                                    </div>


                                    <div className="form-group">
                                        <label>Position:</label>
                                        <input ptype="email" placeholder="Position" className="form-control"
                                        value={this.state.Position} onChange={this.changePositionHandler} ></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Superior:</label>
                                        <input placeholder="Superior" className="form-control"
                                        value={this.state.Superior} onChange={this.changeSuperiorHandler} ></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Phone No.:</label>
                                        <input placeholder="Phone No." className="form-control"
                                        value={this.state.PhoneNo} onChange={this.changePhoneHandler} ></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Experience Years:</label>
                                        <input placeholder="Experience Year"  className="form-control"
                                        value={this.state.ExperienceYear} onChange={this.changeExperienceYearHandler} ></input>
                                        <small id="passwordHelp" class="text-danger">{this.state.experienceError} </small>
                                    </div>


                                    <div className="form-group">
                                        <label>Office Location:</label>
                                        <input placeholder="Office Location" className="form-control"
                                        value={this.state.OfficeLocation} onChange={this.changeOfficeLocationHandler}></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Address:</label>
                                        <textarea rows="3" placeholder="Address"  className="form-control"
                                        value={this.state.Address} onChange={this.changeAddressHandler} ></textarea >
                                    </div>


                                    <div className="form-group">
                                        <label>Date of Birth: </label>
                                        <TextField id="datefield"  type="date" value={this.state.DOB} onChange={this.changeDOBHandler} InputLabelProps={{shrink: true,}}/>
                                    </div>


                                    <div className="form-group">
                                        <label>Date Joined: </label>
                                        <TextField id="datefield"  type="date" value={this.state.DateJoined} onChange={this.changeDateJoinedHandler} InputLabelProps={{shrink: true,}}/>
                                    </div>

                                    <div>
                                    <hr/>
                                    <label>Attachment</label>
                                    <br/>
                                    <input type="file" multiple onChange={uploadAttachment} ></input>
                                    <br/>
                                    <br/>
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
                                </div>

                                    <button className="btn float-left" onClick={this.goBack}>Cancel</button>
                                    <button type="submit" className="btn btn-primary  btn-rounded float-right" onClick={this.checker}>Save</button>
                                </form>
                            </div>
                        
                    </div>
                </div>
            </div>
        )
    }
    
}

export default CreateEmployee
