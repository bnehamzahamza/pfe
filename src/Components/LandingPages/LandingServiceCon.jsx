import React, { Component } from 'react'
import AuthSc from '../../Auth/AuthSc';
import DemandeServices from '../../Services/DemandeServices'
import ServiceConcerneService from '../../Services/ServiceConcerneService'
import './LandingEmployee.css';

export default class LandingServiceCon extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            id : this.props.match.params.id,
            demandes:[],
            etat:'en cours de realisation'
        }
        this.consulteDemande = this.consulteDemande.bind(this);
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
            DemandeServices.FiltreDemandeByEtat(ListDem,"en cours de realisation").then((res) => {
                this.setState({demandes:res.data});
                console.log('ListDemApres => '+JSON.stringify(this.state.demandes));
            })

        }

        )
    }

    consulteDemande(demande){
        DemandeServices.getDemandeById(demande).then((res) => {
            let dem = res.data
    
            this.props.history.push(`/besoins/${dem.id}`);
        })
    }

    versEncours(){
        this.props.history.push(`/pageSc/${this.props.match.params.id}`);
    }

    versNouvelles(){
        this.props.history.push(`/sc-nouvelle/${this.props.match.params.id}`)
    }

    versReporter(){
        this.props.history.push(`/sc-reporter/${this.props.match.params.id}`)
    }

    versDeconnexion(){
        AuthSc.logout(() => {
            this.props.history.push('/login-sc');
        })
    }

    render() {
        return (
            <div>
                <div>
                    <ul>
                    <li><button class="active" onClick={()=> {this.versEncours()}}>demandes en cours</button></li>
                    <li><button onClick={()=> {this.versNouvelles()}}>nouvelles demandes</button></li>
                    <li><button onClick={()=> {this.versReporter()}}>demandes reportés</button></li>
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
                                    <td><button id="affectButton" onClick={() =>this.consulteDemande(demande.id)} className="btn btn-dark">Consulter</button>
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
