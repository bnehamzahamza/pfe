import React, { Component } from 'react'
import BesoinsServices from '../../Services/BesoinsServices';
import DemandeServices from '../../Services/DemandeServices';
import './ConslulteDdes.css'

export default class ConsulteDdes extends Component {
    
    constructor(props) {
        super(props);
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
            totalM:0,
            totalP:0,
            totalF:0,
            TotalDemande:0

        }
    }

    componentDidMount(){

        DemandeServices.getDemandeById(this.state.id).then((res)=>{
            this.setState({demande:res.data})
            BesoinsServices.getBesoinsByDemandeId(this.state.demande).then((res)=>{
                this.setState({BesoinI:res.data})
                BesoinsServices.setBesoins(this.state.BesoinI).then((res)=>{
                    this.setState({BesoinF:res.data})
                    let total_demande = 0
                    console.log("Besoin id => "+JSON.stringify(this.state.BesoinF.id));
                    BesoinsServices.getFournitures(this.state.BesoinF).then((res) => {
                        let MAT = res.data  
                        let total =0
                        MAT.map(
                            mater => {
                                let inter=(mater.qte*mater.prix)
                                total+=inter
                                console.log("vbi=> "+JSON.stringify(total))
                                return this.setState({totalF:total})
                                 
                                
                            }
                            
                        )   
                        total_demande+=this.state.totalF  
                        this.setState({Fournitures:res.data})
                        console.log("fourniture => "+JSON.stringify(this.state.Fournitures));
                    })
                    BesoinsServices.getMateriels(this.state.BesoinF).then((res) => {
                        let MAT = res.data  
                        let total =0
                        MAT.map(
                            mater => {
                                let inter=(mater.qte*mater.prix)
                                total+=inter
                                console.log("vbi=> "+JSON.stringify(total))
                                
                                return this.setState({totalM:total})
                                
                                
                                
                            }  
                        )  
                        total_demande+=this.state.totalM               
                        this.setState({Materiels:MAT})

                        console.log("materiel => "+JSON.stringify(this.state.Materiels));
                    })
                    BesoinsServices.getPersonnels(this.state.BesoinF).then((res) => {
                        let MAT = res.data  
                        let total =0
                        MAT.map(
                            mater => {
                                let inter=(mater.nbre_heure*mater.prix)
                                total+=inter
                                console.log("vbi=> "+JSON.stringify(total))
                                
                                return this.setState({totalP:total})
                                 
                            }
                        )   
                        total_demande+=this.state.totalP 
                        this.setState({TotalDemande:total_demande}) 
                        this.setState({Personnels:res.data})
                        console.log("personnel => "+JSON.stringify(this.state.Personnels));
                    })
                    this.setState()
                })
            })
        })
  
    }

    
    render() {
        return (
            <div id="oneForAll">
                <table class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th style={{fontWeight:"900",fontSize:"25px",width:"1%",color:"#D8E3E7"}} scope="col">Fourniture:</th>
                        <th style={{textAlign:"center"}} scope="col">Nom</th>
                        <th style={{textAlign:"center"}} scope="col">Quantité</th>
                        <th style={{textAlign:"center"}} scope="col">Prix</th>
                        <th style={{textAlign:"center"}} scope="col">Sous-total</th>
                        <th style={{textAlign:"center",cursor:"pointer",color:"cyan"}} scope="col"><div id="dropdown">
                                <p id="dropbtn" style={{margin:"0"}}  >TOTAL</p>
                                <div id="dropdown-content">
                                
                                    <a href="/" style={{color:"white"}}>{this.state.totalF}</a>

                                </div>
                                </div></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.Materiels.map(
                           materiel =>
                           
                               
                           <tr key={materiel.id}>
                               <td></td>
                               <td>{materiel.nom}</td>
                               <td>{materiel.qte}</td>
                               <td>{materiel.prix}</td>
                               <td>{materiel.prix*materiel.qte}</td>
                               <td></td>
                           </tr>  
                           
                       )}
                    </tbody>
                    </table>
                   
                   
                    <table class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th style={{fontWeight:"900",fontSize:"25px",width:"1%",color:"#D8E3E7"}} scope="col">Personnel:</th>
                        <th style={{textAlign:"center"}} scope="col">Spécialité</th>
                        <th style={{textAlign:"center"}} scope="col">Nombre d'heure</th>
                        <th style={{textAlign:"center"}} scope="col">Prix</th>
                        <th style={{textAlign:"center"}} scope="col">Sous-total</th>
                        <th style={{textAlign:"center",cursor:"pointer",color:"cyan"}} scope="col"><div id="dropdown">
                                <p id="dropbtn" style={{margin:"0"}}  >TOTAL</p>
                                <div id="dropdown-content">
                                    <a href="/" style={{color:"white"}}>{this.state.totalP}</a>
                                </div>
                                </div></th>
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
                                    <td>{personnel.prix}</td>
                                    <td>{personnel.prix*personnel.nbre_heure}</td>
                                    <td></td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table>

                    <table class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th style={{fontWeight:"900",fontSize:"25px",width:"1%",color:"#D8E3E7"}} scope="col">Fourniture:</th>
                        <th style={{textAlign:"center"}} scope="col">Id</th>
                        <th style={{textAlign:"center"}} scope="col">Lieu</th>
                        <th style={{textAlign:"center"}} scope="col">Prix</th>
                        <th style={{textAlign:"center"}} scope="col">Sous-total</th>
                        <th style={{textAlign:"center",cursor:"pointer",color:"cyan"}} scope="col"><div id="dropdown">
                                <p id="dropbtn" style={{margin:"0"}}  >TOTAL</p>
                                <div id="dropdown-content">
                                    <a href="/" style={{color:"white"}}>{this.state.totalF}</a>
                                </div>
                                </div></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.Fournitures.map(
                                fourniture =>
                                <tr key={fourniture.id}>
                                    <td></td>
                                    <td>{fourniture.nom}</td>
                                    <td>{fourniture.qte}</td>
                                    <td>{fourniture.prix}</td>
                                    <td>{fourniture.qte*fourniture.prix}</td>
                                    <td></td>

                                </tr>
                            )
                        }
                    </tbody>
                    </table>
                    <table class="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th style={{fontWeight:"900",fontSize:"25px",width:"1%",color:"#D8E3E7"}} scope="col">Total de la demande: <p style={{float:"right",color:"white"}}>{this.state.demande.frais}</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                    </table>
            </div>
        )
    }
}
