import axios from 'axios';

const BASE_API_RESPONSABLE_URL = "http://localhost:8082/responsable";

class ResponsableServices {

    setDemandeByEmp(emp){
        return axios.post(BASE_API_RESPONSABLE_URL + '/setdemande' , emp);
    }

    getDemandesById(id){
        return axios.get(BASE_API_RESPONSABLE_URL + '/getdemande/' + id);
    }

    checkLog(login,mdp){
        return axios.get(BASE_API_RESPONSABLE_URL + '/testlog?login=' + login + '&mdp=' + mdp);
    }





}
export default new ResponsableServices();