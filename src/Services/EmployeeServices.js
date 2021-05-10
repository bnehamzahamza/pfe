import axios from 'axios';

const BASE_API_EMPLOYEE_URL = "http://localhost:8082/employee";

class EmployeeServices {
    getEmployees(){
       return axios.get(BASE_API_EMPLOYEE_URL +'/');
    }

    checkLog(login,mdp){
        return axios.get(BASE_API_EMPLOYEE_URL +'/login' ,login,mdp);
    }
}

export default new EmployeeServices();