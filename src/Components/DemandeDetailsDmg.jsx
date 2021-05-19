import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices'
import './DemandeDetails.css'

export default class DemandeDetailsDmg extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id ,
           demande: []
       

        }

        this.refuser = this.refuser.bind(this);
        this.accordRes = this.accordRes.bind(this);
        
    }

    componentDidMount(){
        DemandeServices.getDemandeById(this.state.id).then((res) => {
            this.setState({demande: res.data})
            console.log('Demande => '+JSON.stringify(this.state.demande));

        
        })
    }

accordRes(id,demande){
    //refuser et supprimer demande
    DemandeServices.acceptDmg(id,demande).then(() => {
        this.props.history.push(`/affectationSc/${id}`)
    })
}


refuser(id){
    //changer accordtDmgonsable vers vrai
    DemandeServices.deleteDemande(id).then(() => 
    this.props.history.push('/demandedmg')
    )
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
                    <button className="btn btn-info" onClick={() => this.accordRes(this.state.id,this.state.demande)}>accepter</button>
                    <button className="btn btn-danger" onClick={() => this.refuser(this.state.id)}>Refuser</button>
                </div>

            </div>
        )
    }
}
