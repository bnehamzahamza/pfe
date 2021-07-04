import axios from 'axios';

const BASE_API_DMG_URL = "http://localhost:8082/dmg";

class DmgServices {

    CheckLogDmg(login,mdp){
        return axios.get(BASE_API_DMG_URL + '/get/?log=' + login + '&mdp=' + mdp)
    }

}
export default new DmgServices();