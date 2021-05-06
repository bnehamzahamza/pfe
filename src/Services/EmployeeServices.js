import axios from 'axios';

const BASE_API_EMPLOYEE_URL = "http://localhost:8082/api/v1/employees";

class EmployeeServices {
    getEmployees(){
       return axios.get(BASE_API_EMPLOYEE_URL);
    }
}

export default new EmployeeServices();