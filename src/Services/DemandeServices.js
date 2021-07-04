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

    updateDemande(demandeId,demande){
        return axios.put(BASE_API_EMPLOYEE_URL + '/' + demandeId,demande)
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

    getDemandeByEmployee(id){
        return axios.get(BASE_API_EMPLOYEE_URL + '/getbyempid/' + id);
    }

    getDemandeByEtat(etat){
        return axios.get(BASE_API_EMPLOYEE_URL + '/getbyetat/' + etat)
    }

    FiltreDemandeByEtat(ListDemande,Etat){
        return axios.post(BASE_API_EMPLOYEE_URL +'/filtrerbyetat/' + Etat,ListDemande);
    }

    getDemandeResById(demandes){
        return axios.post(BASE_API_EMPLOYEE_URL +'/demanderes' , demandes);
    }

    getCouts(besoin){
        return axios.put("http://localhost:8082/demande/get/couts", besoin);
    }

    getDemandeByDep(dep){
        return axios.get(BASE_API_EMPLOYEE_URL + '/get/bydep?dep=' + dep);
    }

    //tri demande par date
    TriDemandeAsc(List){
        return axios.post(BASE_API_EMPLOYEE_URL + '/get/bydateasc',List);
    }

    TriDemandeDesc(List){
        return axios.post(BASE_API_EMPLOYEE_URL + '/get/bydatedesc',List);
    }

}

export default new DemandeServices();