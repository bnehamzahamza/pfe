import React, { Component } from 'react'
//import DemandeServices from '../Services/DemandeServices';
import './PassDemande.css';
import * as moment from 'moment';
import EmployeeServices from '../Services/EmployeeServices';

export default class PassDemande extends Component {

    constructor(props) {
        super(props)

        var today = new Date();
        var newDate = moment(today, 'YYYY-MM-DD');
        this.state = {
            destinataire : '',
            lieu : '',
            degre_urgence : '',
            description : '',
            date_d: newDate ,
            accord_responsable: 0,
            accord_dmg: 0,
            employee_id : [],
            emp_id : this.props.match.params.id


        }
        this.changeDestinataire = this.changeDestinataire.bind(this);
        this.changeLieu = this.changeLieu.bind(this);
        this.changeUrgence = this.changeUrgence.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.saveDemande = this.saveDemande.bind(this);

    }
    
    componentDidMount(){
        console.log('id => '+JSON.stringify(this.state.emp_id));
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

   
    saveDemande = (e) => {
        e.preventDefault();
        
        let Demande = {destinataire: this.state.destinataire,lieu: this.state.lieu,degre_urgence: this.state.degre_urgence,description: this.state.description,
        date_D: this.state.date_d,etat: 'en cours d\'etude',accord_dmg: Boolean(this.state.accord_dmg),accord_responsable:Boolean(this.state.accord_responsable)};
        
        console.log('Demande => '+JSON.stringify(Demande));

        
       
        EmployeeServices.addDemandeEmp(this.state.emp_id,Demande).then(() => {
            this.props.history.push("/admin");
        })
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
                    <textarea type="text" className="form-control" placeholder="decription"
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
