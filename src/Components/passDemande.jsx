import React, { Component } from 'react'
export default class PassDemande extends Component {

    constructor(props) {
        super(props)

        this.state = {
            destinataire : '',
            lieu : '',
            degre_urgence : '',
            description : ''


        }
        this.changeDestinataire = this.changeDestinataire.bind(this);
        this.changeLieu = this.changeLieu.bind(this);
        this.changeUrgence = this.changeUrgence.bind(this);
        this.changeDescription = this.changeDescription.bind(this);

    }

    changeDestinataire= (event) => {
        this.setState({destinataire: event.target.value});
    }
    changeLieu= (event) => {
        this.setState({lieu: event.target.value});
    }
    changeUrgence= (event) => {
        this.setState({degre_urgence: event.target.value});
    }
    changeDescription= (event) => {
        this.setState({description: event.target.value});
    }

    


    render() {
        return (
            <div className="container">
                        <form id="divLog">

                <h3 className="text-center">connexion</h3>

                <div className="form-group">
                    <label>destinataire</label>
                    <input className="form-control" placeholder="destination" value={this.state.destinataire} onChange={this.changeDestinataire} />
                </div>

                <div className="form-group">
                    <label>lieu</label>
                    <input className="form-control" placeholder="lieu"
                    value={this.state.lieu}  onChange={this.changeLieu} />
                </div>

                <div className="form-group">
                    <label>dégre d'urgence</label>
                    <input className="form-control" placeholder="urgent!"
                    value={this.state.degre_urgence}  onChange={this.changeUrgence} />
                </div>

                <div className="form-group">
                    <label>description</label>
                    <input type="text" className="form-control" placeholder="decription"
                    value={this.state.description}  onChange={this.changeDescription} />
                </div>


                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.saveDemande}>Connexion</button>
                <p className="forgot-password text-right">
                </p>
                </form>
            </div>
        )
    }
}
