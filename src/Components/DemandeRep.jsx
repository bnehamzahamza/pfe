import React, { Component } from 'react'
import AuthSc from '../Auth/AuthSc';
import DemandeServices from '../Services/DemandeServices';
import ServiceConcerneService from '../Services/ServiceConcerneService';
import './LandingPages/LandingEmployee.css';
export default class DemandeRep extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id:this.props.match.params.id,
            demandes: [],
            demande:[],
            etat:'en cours de realisation'

        }
        this.changeDemande = this.changeDemande.bind(this);
        this.versReporter = this.versReporter.bind(this);
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versEncours = this.versEncours.bind(this);
        this.versDeconnexion = this.versDeconnexion.bind(this);


    }

    componentDidMount(){
        ServiceConcerneService.getDemandeBySc(this.state.id).then((res) => 
        {
            let ListDem = res.data
            console.log('ListDemAvant => '+JSON.stringify(ListDem));
            DemandeServices.FiltreDemandeByEtat(ListDem,"reporter").then((res) => {
                this.setState({demandes:res.data});
                console.log('ListDemApres => '+JSON.stringify(this.state.demandes));
            })

        }

        )
    }

    changeDemande(id){
        let dem = {etat:'en cours de realisation'}
                DemandeServices.updateDemande(id,dem).then(() => {
                    this.props.history.push(`/pageSc/${this.props.match.params.id}`);
                })

        
    }

    versEncours(){
        this.props.history.push(`/pageSc/${this.props.match.params.id}`);
    }

    versNouvelles(){
        this.props.history.push(`/sc-nouvelle/${this.props.match.params.id}`);
    }

    versReporter(){
        this.props.history.push(`/sc-reporter/${this.props.match.params.id}`);
    }

    versDeconnexion(){
        AuthSc.logout(() => {
            this.props.history.push('/login-sc');
        })
    }


    render() {
        return (
            <div style={{}}>
                 <div>
                    <ul>
                    <li><button onClick={()=> {this.versEncours()}}>demandes en cours</button></li>
                    <li><button onClick={()=> {this.versNouvelles()}}>nouvelles demandes</button></li>
                    <li><button class="active" onClick={()=> {this.versReporter()}}>demandes reportés</button></li>
                    <li><button id="deconnexion" onClick={()=> {this.versDeconnexion()}}>Deconnexion Service</button></li>
                    </ul>
                </div>
                <div className="row">
                <table id="tab-ad" className="table table-striped table-dark">
                    <thead className="thead-dark">
                        <tr>
                        <th>Date</th>
                        <th>lieu</th>
                        <th>degre d'urgence</th>
                        <th>etat</th>
                        <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.demandes.map(
                            demande =>
                                
                                    <tr key={demande.id}>
                                    <td>{demande.date_D.slice(0,10)}</td>
                                    <td>{demande.lieu}</td>
                                    <td>{demande.degre_urgence}</td>
                                    <td>{demande.etat}</td>
                                    <td><button id="affectButton" onClick={() =>this.changeDemande(demande.id)} className="btn btn-dark">Initialiser</button>
                                    </td>
                                </tr>
                                
                            
                                )}  
                           
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}
