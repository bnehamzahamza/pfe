import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices'

export default class DemandeDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id ,
           demande: []

        }
    }

    componentDidMount(){
        DemandeServices.getDemandeById(this.state.id).then((res) => {
            this.setState({demande: res.data})

        
        })
    }

    test(etat){
        if (etat === "en cours d'etude")
        {
            return (
                <div>
                    <button className="btn btn-danger">refuser</button>
                    <button className="btn btn-success">initialiser</button>
                    <button className="btn btn-warning">reporter</button>
                </div>
            )
        }
        else if(etat === "en cours de realisation"){
            <div>
                <button className="btn btn-info">finir</button>
                <button className="btn btn-warning">arreter</button>
            </div>
        }
    }




    render() {
        return (
            <div id="div_all" className="container">
                <div>
                <h5>Date : </h5>
                    <h6>{this.state.demande.date_D}</h6>
                    </div>
                <div>
                <h5>lieu : </h5>
                    <h6>{this.state.demande.lieu}</h6>
                    </div>
                <div>
                <h5>discription : </h5>
                    <h6>{this.state.demande.description}</h6>
                    </div>
                <div>
                <h5>degre d'urgence : </h5>
                    <h6>{this.state.demande.degre_urgence}</h6>
                    </div>
                <div>
                <h5>etat : </h5>
                    <h6>{this.state.demande.etat}</h6>
                    </div>
                <div>
                <h5>changer l'etat : </h5>
                    {
                        this.test(this.state.demande.etat)
                    }
                </div>

            </div>
        )
    }
}
