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

    
}
export default new HttpService()