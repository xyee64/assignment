import axios from 'axios';
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee/";

class HttpService{
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL );
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL+id);
    }
    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL+id);
    }
}
export default new HttpService()
