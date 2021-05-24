import React, { Component } from 'react'
import BesoinsServices from '../Services/BesoinsServices';
import DemandeServices from '../Services/DemandeServices';
import './Besoins.css'

export default class Besoins extends Component {
    constructor(props) {
        super(props)

        
        this.state = {
            id : this.props.match.params.id ,
            demande: [],
            Nom:'',
            qte:'',
            BesoinI: [],
            BesoinF:[],
            Fournitures:[],
            Materiels:[],
            Personnels:[]

        }
          this.versFournitures = this.versFournitures.bind(this);
          this.versMateriels = this.versMateriels.bind(this);
          this.versPersonnels = this.versPersonnels.bind(this);
    }
    componentDidMount(){

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
                this.props.history.push(`/add-fourniture/${resultat.id}`)
                console.log("id => "+JSON.stringify(resultat.id));
             
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
                <div id="ajout">
                    <div>
                        <label>ajouter fourniture : </label>
                        <button className="btn btn-info" onClick={()=> {this.versFournitures()}} >fourniture</button>
                    </div>
                    <div>
                        <label>ajouter matériel : </label>
                        <button className="btn btn-info" onClick={()=> {this.versMateriels()}}>matériel</button>
                    </div>
                    <div>
                        <label>ajouter main d'oeuvre : </label>
                        <button className="btn btn-info" onClick={()=> {this.versPersonnels()}}>personnel</button>
                    </div>
                </div>
                <div className="row">
                    
                <div className="column">
                <h3>Fourniture</h3>
                <table id="tab-ad" className="table table-bordered">
                    <thead >
                        <tr>
                        <th>nom</th>
                        <th>qte</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.Fournitures.map(
                           fourniture =>
                           <tr key={fourniture.id}>
                               <td>{fourniture.nom}</td>
                               <td>{fourniture.qte}</td>
                           </tr>
                       )}
                    </tbody>
                </table>
            </div>
            <div className="column">
            <h3>personnel</h3>
                <table id="tab-ad" className="table table-bordered">
                    <thead >
                        <tr>
                        <th>spécialité</th>
                        <th>nombres d'heures</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Personnels.map(
                                personnel =>
                                <tr key={personnel.id}>
                                    <td>{personnel.specialite}</td>
                                    <td>{personnel.nbre_heure}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="column">
            <h3>matériels</h3>
                <table id="tab-ad" className="table table-bordered">
                    <thead >
                        <tr>
                        <th>id</th>
                        <th>lieu</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.Materiels.map(
                                materiel =>
                                <tr key={materiel.id}>
                                    <td>{materiel.nom}</td>
                                    <td>{materiel.qte}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
                </div>
            </div>
        )
    }
}
