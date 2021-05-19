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
    //get demandes for responsable
    getDemandeRes(){
        return axios.get(BASE_API_EMPLOYEE_URL +'/demanderes')
    }

    //get demandes for DMG
    getDemandeDmg(){
        return axios.get(BASE_API_EMPLOYEE_URL +'/demandedmg')
    }

    //delete demande
    deleteDemande(id){
        return axios.delete(BASE_API_EMPLOYEE_URL+'/delete/' + id);
    }

    //change accordRes
    acceptResp(id,demande){
        return axios.put(BASE_API_EMPLOYEE_URL + '/accordres/' + id ,demande)
    }

    acceptDmg(id,demande){
        return axios.put(BASE_API_EMPLOYEE_URL + '/accorddmg/' + id ,demande)
    }


}

export default new DemandeServices();