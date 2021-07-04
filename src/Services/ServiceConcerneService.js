import axios from 'axios';

const BASE_API_SERVICE_URL = "http://localhost:8082/serviceconcerne";
class ServiceConcerneService {

    getServiceByNom(nom,demande){
        return axios.put(BASE_API_SERVICE_URL +'/getnom?nom='+nom,demande);
    }

    getDemandeBySc(id){
        return axios.get(BASE_API_SERVICE_URL +'/liste?id='+id);
    }

    checkLog(login,mdp){
        return axios.get(BASE_API_SERVICE_URL + '/checklog/?log=' + login + '&mdp=' + mdp)
    }
    //get all Services
    getService(){
        return axios.get(BASE_API_SERVICE_URL + '/');
    }

    getDemandes(nom){
        return axios.get(BASE_API_SERVICE_URL + '/getdemandebynom/' + nom);
    }
}
export default new ServiceConcerneService();