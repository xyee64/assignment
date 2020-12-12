import React, { Component } from 'react';
import Register from './Register';
import CreateEmployee from './CreateEmployee';

export class UserForm extends Component {
    state = {
        step: 1,
        name:'',
        password:''
    }
    
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    render() {
        const {step} = this.state;

       switch(step){
           case 1:
               return (
                   <Register 
                   nextStep = {this.nextStep}
                   />
                    )
            case 2:
                return (
                    <CreateEmployee 
                    nextStep = {this.nextStep}
                    prevStep = {this.prevStep}
                    />
                    )
            case 3:
                return <h1>Confirm</h1>
            case 4:
                return <h1>Success</h1>
       }
    }
}

export default UserForm




