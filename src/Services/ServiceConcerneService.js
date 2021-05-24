import axios from 'axios';

const BASE_API_SERVICE_URL = "http://localhost:8082/serviceconcerne";
class ServiceConcerneService {

    getServiceByNom(nom,demande){
        return axios.put(BASE_API_SERVICE_URL +'/getnom?nom='+nom,demande);
    }

    getDemandeBySc(id){
        return axios.get(BASE_API_SERVICE_URL +'/liste?id='+id);
    }
}
export default new ServiceConcerneService();