import axios from 'axios';

const BASE_API_SERVICE_URL = "http://localhost:8082/serviceconcerne";
class ServiceConcerneService {

    getServiceByNom(nom,demande){
        return axios.put(BASE_API_SERVICE_URL +'/getnom?nom='+nom,demande);
    }
}
export default new ServiceConcerneService();