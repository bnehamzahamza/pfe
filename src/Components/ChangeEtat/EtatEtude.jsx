import React, { Component } from 'react'

export default class EtatEtude extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id ,
           demande: [],
           reporter: 'reporter',
           refuser: 'refuser',
           realisation: 'en cours de realisation'


        }
        this.changeEtat = this.changeEtat.bind(this)
    }

    componentDidMount(){
        DemandeServices.getDemandeById(this.state.id).then((res) => {
            this.setState({demande: res.data})

        
        })
    }

    changeEtat(id,etat){
        DemandeServices.updateDemande(id,etat)
    }


    render() {
        return (
            <div>
                
                    <button className="btn btn-danger" onClick={this.changeEtat(this.state.id,this.state.refuser)}>refuser</button>
                    <button className="btn btn-success" onClick={this.changeEtat(this.state.id,this.state.realisation)}>initialiser</button>
                    <button className="btn btn-warning" onClick={this.changeEtat(this.state.id,this.state.reporter)}>reporter</button>
                
            </div>
        )
    }
}
