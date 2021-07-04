import React, { Component } from 'react'
import BesoinsServices from '../Services/BesoinsServices';
import DemandeServices from '../Services/DemandeServices';
import './Besoins.css'
import * as moment from 'moment';

export default class Besoins extends Component {
    constructor(props) {
        super(props)
        var today = new Date();
        var newDate = moment(today, 'YYYY-MM-DD');
       
        this.state = {
            id : this.props.match.params.id ,
            demande: [],
            Nom:'',
            qte:'',
            BesoinI: [],
            BesoinF:[],
            Fournitures:[],
            Materiels:[],
            Personnels:[],
            date_F: newDate

        }
          this.versFournitures = this.versFournitures.bind(this);
          this.versMateriels = this.versMateriels.bind(this);
          this.versPersonnels = this.versPersonnels.bind(this);
          this.versFinis = this.versFinis.bind(this);
    }
    componentDidMount(){
        console.log("date _finale => "+JSON.stringify(this.state.date_F));
        DemandeServices.getDemandeById(this.state.id).then((res)=>{
            this.setState({demande:res.data})
            BesoinsServices.getBesoinsByDemandeId(this.state.demande).then((res)=>{
                this.setState({BesoinI:res.data})
                BesoinsServices.setBesoins(this.state.BesoinI).then((res)=>{
                    this.setState({BesoinF:res.data})
                    BesoinsServices.getFournitures(this.state.BesoinF).then((res) => {
                        this.setState({Fournitures:res.data})
                        console.log("fourniture => "+JSON.stringify(this.state.Fournitures));
                    })
                    BesoinsServices.getMateriels(this.state.BesoinF).then((res) => {
                        this.setState({Materiels:res.data})
                        console.log("materiel => "+JSON.stringify(this.state.Materiels));
                    })
                    BesoinsServices.getPersonnels(this.state.BesoinF).then((res) => {
                        this.setState({Personnels:res.data})
                        console.log("personnel => "+JSON.stringify(this.state.Personnels));
                    })
                })
            })
        })
  
    }

    versFournitures=(e)=>{
        
        DemandeServices.getDemandeById(this.state.id).then((res)=>{
            let result = res.data
            BesoinsServices.getBesoinsByDemandeId(result).then((res)=>{
            let resultat = res.data
                
                console.log("id => "+JSON.stringify(resultat.id));
                var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
                var resCrypt = urlCrypt.cryptObj(resultat.id)
                console.log("id crypté => "+JSON.stringify(resCrypt))
                this.props.history.push(`/add-fourniture/${resCrypt}`);
                
             
            })
            
        })
    }

    versMateriels=(e)=>{
        
        DemandeServices.getDemandeById(this.state.id).then((res)=>{
            let result = res.data
            BesoinsServices.getBesoinsByDemandeId(result).then((res)=>{
            let resultat = res.data
                this.props.history.push(`/add-materiel/${resultat.id}`)
                console.log("id => "+JSON.stringify(resultat.id));
             
            })
            
        })
    }

    versFinis=(e)=>{
        let dem = {
            etat:"finis"
        }
        DemandeServices.updateDemande(this.props.match.params.id,dem).then(()=>{
            DemandeServices.getDemandeById(this.props.match.params.id).then((res) => {
                BesoinsServices.getBesoinsByDemandeId(res.data).then((res) => {
                    let dem = res.data
                    let newDem = {
                        id:dem.id,besoinsF_id:dem.besoinsF_id,besoinsM_id:dem.besoinsM_id,besoinsP_id:dem.besoinsP_id,
                        demande_id:dem.demande_id,date_F:this.state.date_F
                    }
                    console.log("besoins => "+JSON.stringify(newDem));
                    BesoinsServices.setDateFinale(dem.id,newDem)
                    DemandeServices.getCouts(dem).then(() =>{
                        this.props.history.push(`/pageSc/1`);
                    })
                   

                })
            })
    
            
        })

       

    }


    versPersonnels=(e)=>{
        
        DemandeServices.getDemandeById(this.state.id).then((res)=>{
            let result = res.data
            BesoinsServices.getBesoinsByDemandeId(result).then((res)=>{
            let resultat = res.data
                this.props.history.push(`/add-personnel/${resultat.id}`)
                console.log("id => "+JSON.stringify(resultat.id));
             
            })
            
        })
    }


    render() {
        return (

            <div>
                <body style={{backgroundColor:"#454d55"}}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3 mt-3 mb-3">
                                <button id="addFM" className="btn btn-info" onClick={()=> {this.versFournitures()}} >Ajouter fourniture</button>
                            </div>
                            <div class="col-md-3 mt-3 mb-3">
                                <button id="addFM" className="btn btn-info" onClick={()=> {this.versMateriels()}}>Ajouter matériel</button>
                            </div>
                            <div class="col-md-3 mt-3 mb-3">
                                <button id="addFM" className="btn btn-info" onClick={()=> {this.versPersonnels()}}>Ajouter personnel</button>
                            </div>
                            <div class="col-md-3">
                                <label> </label>
                                <button id="addFMD" className="btn btn-danger" onClick={() =>{this.versFinis()}} >cloturer la demande</button>
                            </div>
                        </div>
                    </div>
<table style={{border:"0px"}} class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th style={{fontWeight:"900",fontSize:"25px",width:"1%"}} scope="col">Fourniture:</th>
                        <th style={{textAlign:"center"}} scope="col">NOM</th>
                        <th style={{textAlign:"center"}} scope="col">QUANTITE</th>
                    </tr>
                    </thead>
                    <tbody>

                        
                        {this.state.Fournitures.map(
                           fourniture =>
                           <tr key={fourniture.id}>
                               <td></td>
                               <td>{fourniture.nom}</td>
                               <td>{fourniture.qte}</td>
                           </tr>
                       )}

                   
                    </tbody>
                    </table>
<table style={{border:"0px",textAlign:"center"}} class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th id="th-pers" style={{fontWeight:"900",fontSize:"25px",width:"1%"}} scope="col">Personnel:</th>
                        <th id="th-pers" style={{textAlign:"center"}} scope="col">SPECIALITE</th>
                        <th id="th-pers" style={{textAlign:"center"}} scope="col">NOMBRE D'HEURE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.Personnels.map(
                                personnel =>
                                <tr key={personnel.id}>
                                    <td></td>
                                    <td>{personnel.specialite}</td>
                                    <td>{personnel.nbre_heure}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
<table style={{border:"0px"}} class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th style={{fontWeight:"900",fontSize:"25px",width:"1%"}} scope="col">Matériel:</th>
                        <th style={{textAlign:"center"}} scope="col">NOM</th>
                        <th style={{textAlign:"center"}} scope="col">QUANTITE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.Materiels.map(
                                materiel =>
                                <tr key={materiel.id}>
                                    <td></td>
                                    <td>{materiel.nom}</td>
                                    <td>{materiel.qte}</td>
                                </tr>
                            )
                        }

                    </tbody>
                    </table>
     </body>
            </div>
        )
    }
}
