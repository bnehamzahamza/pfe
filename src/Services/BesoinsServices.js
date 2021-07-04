import axios from "axios";

class BesoinsServices {

    //ajouter mat
    ajoutF(fourniture){
        return axios.post("http://localhost:8082/besoins/setf",fourniture);
    }

    ajoutD(demande,id){
        return axios.post("http://localhost:8082/besoins/setd?id="+id,demande);
    }

    getBesoinsByDemandeId(demande){
        return axios.put("http://localhost:8082/besoins/getdb", demande);
    }

    setBesoins(besoin){
        return axios.post("http://localhost:8082/besoins/",besoin);
    }

    getFournitures(besoin){
        return axios.post("http://localhost:8082/besoins/getf",besoin);
    }

    getMateriels(besoin){
        return axios.post("http://localhost:8082/besoins/getm",besoin);
    }

    getPersonnels(besoin){
        return axios.post("http://localhost:8082/besoins/getp",besoin);
    }

    getBesoinById(id){
        return axios.get("http://localhost:8082/besoins/getbyid/"+id);
    }

    setFournitureByBesoinId(id,fourniture){
        return axios.put("http://localhost:8082/besoins/setfb/"+id,fourniture)
    }

    setPersonnelByBesoinId(id,personnel){
        return axios.put("http://localhost:8082/besoins/setpb/"+id,personnel)
    }

    setMaterielByBesoinId(id,materiel){
        return axios.put("http://localhost:8082/besoins/setmb/"+id,materiel)
    }

    setDateFinale(id,besoin){
        return axios.put("http://localhost:8082/besoins/setdatef/?id=" + id, besoin);
    }

    getDateDiff(date1,date2){
        return axios.get("http://localhost:8082/besoins/datediff?date1="+date1+"&date2="+date2);
    }

    //get all Costs in details

    getCostFourniture(besoin){
        return axios.post("http://localhost:8082/besoins/getfrcost", besoin);
    }
    getCostPersonnel(besoin){
        return axios.post("http://localhost:8082/besoins/getprcost", besoin);
    }
    getCostMateriel(besoin){
        return axios.post("http://localhost:8082/besoins/getmtcost", besoin);
    }

}
export default new BesoinsServices();