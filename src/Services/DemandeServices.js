import axios from 'axios';

const BASE_API_EMPLOYEE_URL = "http://localhost:8082/demande";

class DemandeServices {
    getDemande(){
       return axios.get(BASE_API_EMPLOYEE_URL +'/get');
    }

    setDemande(demande){
        return axios.post(BASE_API_EMPLOYEE_URL +'/' ,demande);
    }

    getDemandeById(demandeId){
        return axios.get(BASE_API_EMPLOYEE_URL + '/' + demandeId);
    }

    updateDemande(demandeId,etat){
        return axios.put(BASE_API_EMPLOYEE_URL + '/' + demandeId, etat)
    }

}

export default new DemandeServices();