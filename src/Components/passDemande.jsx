import React, { Component } from 'react'
//import DemandeServices from '../Services/DemandeServices';
import './PassDemande.css';
import * as moment from 'moment';
import EmployeeServices from '../Services/EmployeeServices';
import ResponsableServices from '../Services/ResponsableServices';
import AuthEmp from '../Auth/AuthEmp';

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
        this.versDemande = this.versDemande.bind(this);
        this.versDeconnexion = this.versDeconnexion.bind(this);
        this.versAccueil = this.versAccueil.bind(this);
        

    }
    
    componentDidMount(){
        console.log('dateI => '+JSON.stringify(this.state.date_d))
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

    versAccueil(){
        this.props.history.push(`/employee-land/${this.state.emp_id}`);
    }
    versDemande(){
        this.props.history.push(`/accueil/${this.state.emp_id}`);
    }
    versDeconnexion(){
        AuthEmp.logout(() => {
            console.log("AuthenticatedAfter => "+JSON.stringify(AuthEmp.isAuthenticated()))
            this.props.history.push(`/login-emp`);
        })
    }

   
    saveDemande = (e) => {
        e.preventDefault();
        
        let Demande = {destinataire: this.state.destinataire,lieu: this.state.lieu,degre_urgence: this.state.degre_urgence,description: this.state.description,
        date_D: this.state.date_d,etat: 'en cours d\'etude',accord_dmg: Boolean(this.state.accord_dmg),accord_responsable:Boolean(this.state.accord_responsable)};
        
        console.log('Demande => '+JSON.stringify(Demande));
        let urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF')
        let backagain = urlCrypt.decryptObj(this.state.emp_id)
        console.log("id décrypté "+JSON.stringify(backagain))
        
       
        EmployeeServices.addDemandeEmp(backagain,Demande).then((res) => {
            let result = res.data
            console.log('Employee => '+JSON.stringify(result))

            ResponsableServices.setDemandeByEmp(result).then((res) => {
                console.log('responsable => '+JSON.stringify(res.data))
            })
            this.props.history.push(`/employee-land/${this.state.emp_id}`);
        })
    }


    render() {
        return (
            <div>
                <div>
                <ul>
                <li><button onClick={()=> {this.versAccueil()}}>accueil</button></li>
                <li><button class="active" onClick={()=> {this.versDemande()}}>demande</button></li>
                <li id="Dec"><button onClick={()=> {this.versDeconnexion()}}>Déconnexion</button></li>
                </ul>
            </div>
            
            <div className="container" id="form_demande">
                        <form id="divLog">

                <h3 className="text-center">demande</h3>

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


                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.saveDemande}>Passer</button>
                <p className="forgot-password text-right">
                </p>
                </form>
            </div>
            </div>
        )
    }
}
