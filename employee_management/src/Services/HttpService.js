import axios from 'axios';
import authHeader from './auth-header';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee/";

class HttpService{
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL, { headers: authHeader() });
    }
    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee, { headers: authHeader() });
    }
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL+id, { headers: authHeader() });
    }
    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL+id, { headers: authHeader() });
    }
    getEmployeeByuserName(name){
        return axios.get("http://localhost:8080/findname/"+name, { headers: authHeader() });
    }
    getEmployeeByName(name){
        return axios.get("http://localhost:8080/finduser/"+name, { headers: authHeader() });
    }
    getSoftDeleteUser(){
        return axios.get("http://localhost:8080/softdelete/"+1, { headers: authHeader() });
    }
    getActiveUser(){
        return axios.get("http://localhost:8080/active/"+1, { headers: authHeader() });
    }

    putSoftDelete(employee,id){
        return axios.put("http://localhost:8080/update/"+id, employee,{ headers: authHeader() });
    }
    
    createEmployeeTest(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee, { headers: authHeader() });
    }

    CheckMail(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+"check-email", employee, { headers: authHeader() });
    }
    CheckUsername(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+"check-user", employee, { headers: authHeader() });
    }
    CheckId(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+"check-id", employee, { headers: authHeader() });
    }
    HardDeleteUser(employee){
        return axios.post("http://localhost:8080/deleted/", employee,{ headers: authHeader() });
    }
    upload(file){
        let formData = new FormData()
        formData.append("file",file)
        return axios.post(EMPLOYEE_API_BASE_URL+"upload", formData, { headers: authHeader() })
    }
    
}
export default new HttpService()
