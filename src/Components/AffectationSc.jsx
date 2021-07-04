import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices';
import ServiceConcerneService from '../Services/ServiceConcerneService';
import './Affectation.css'

export default class AffectationSc extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id ,
           demande: [],
           service: ''

        }
        this.serviceChanger = this.serviceChanger.bind(this);
        this.affecterSc = this.affecterSc.bind(this)
    }

    componentDidMount(){
        DemandeServices.getDemandeById(this.state.id).then((res) => {
            this.setState({demande: res.data})
            console.log('Demande => '+JSON.stringify(this.state.demande));

        
        })
    }


    serviceChanger= (event) =>{
        this.setState({service: event.target.value});
    }

    affecterSc(nom,demande){
        ServiceConcerneService.getServiceByNom(nom,demande)
        this.props.history.push("/accueil-dmg");
    }

    render() {
        return (
            <div>
            <form className="container">
            <p id="biska" className="h3">Service à affecter</p> < br/>
            
                <div>
                <input id="affectInput" type="text" 
                placeholder="Entrez le nom du service" 
                onChange={this.serviceChanger}
                className="form-control" aria-label="Default" 
                aria-describedby="inputGroup-sizing-default" />
                </div>

                <div>
                <button id="affectButton" type="button" onClick={() => {this.affecterSc(this.state.service,this.state.demande)}} class="btn btn-outline-success">Affecter</button>
                </div>
                 
            
            </form>
        </div>
        )
    }
}
