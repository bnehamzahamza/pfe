import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices'
import './DemandeDetails.css'

export default class DetailsSc extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id ,
           demande: [],
           arreter: 'arreter',
           reporter: 'reporter',
           refuser: 'refuser',
           realisation: 'en cours de realisation',
           finis: 'finis',
           etat: ''

        }

        this.changeEtat = this.changeEtat.bind(this)
        
    }

    componentDidMount(){
        DemandeServices.getDemandeById(this.state.id).then((res) => {
            this.setState({demande: res.data})
            console.log('Demande => '+JSON.stringify(this.state.demande));

        
        })
    }

    

    changeEtat(id,etats){
        
            let Demande = {id:this.state.id,destinataire: this.state.demande.destinataire,lieu: this.state.demande.lieu,degre_urgence: this.state.demande.degre_urgence,description: this.state.demande.description,
                date_D: this.state.demande.date_d,etat: etats};
    
            DemandeServices.updateDemande(id,Demande)
            if(etats === 'en cours de realisation'){
                this.props.history.push(`/besoins/${id}`);
        }
    }


    render() {
        return (
            <div id="div_all" className="container">
                <div id="div_in">
                <h5>Date : </h5>
                    <h6>{this.state.demande.date_D}</h6>
                    </div>
                <div id="div_in">
                <h5>lieu : </h5>
                    <h6>{this.state.demande.lieu}</h6>
                    </div>
                <div id="div_in">
                <h5>discription : </h5>
                    <h6>{this.state.demande.description}</h6>
                    </div>
                <div id="div_in">
                <h5>degre d'urgence : </h5>
                    <h6>{this.state.demande.degre_urgence}</h6>
                    </div>
                <div id="div_in">
                <h5>etat : </h5>
                    <h6>{this.state.demande.etat}</h6>
                    </div>
                <div id="div_in">
                <h5>changer l'etat : </h5>
                <div>
                    <button className="btn btn-danger" onClick={() => this.changeEtat(this.state.id,this.state.refuser)} >refuser</button>
                    <button className="btn btn-success" onClick={() => this.changeEtat(this.state.id,this.state.realisation)} >initialiser</button>
                    <button className="btn btn-warning" onClick={() => this.this.changeEtat(this.state.id,this.state.reporter)}>reporter</button>
                </div>
                </div>

            </div>
        )
    }
}
