import React, { Component } from 'react'
import AuthEmp from '../../Auth/AuthEmp';
import DemandeServices from '../../Services/DemandeServices';
import './LandingEmployee.css';


export default class LandingEmployee extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            emp_id : this.props.match.params.id,
            demandes:[]
        }
        
        this.versAccueil = this.versAccueil.bind(this);
        this.versDeconnexion = this.versDeconnexion.bind(this);
        this.versDemande = this.versDemande.bind(this);
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

    componentDidMount=() =>{
        let urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF')
        let backagain = urlCrypt.decryptObj(this.state.emp_id)
        console.log("id décrypté "+JSON.stringify(backagain))
        DemandeServices.getDemandeByEmployee(backagain).then((res)=> {
            this.setState({demandes:res.data});
        })
    }




    render() {
        return (
        <div>
            <div>
                <ul>
                <li><button class="active" onClick={()=> {this.versAccueil()}}>accueil</button></li>
                <li><button onClick={()=> {this.versDemande()}}>demande</button></li>
                <li id="Dec"><button onClick={()=> {this.versDeconnexion()}}>Déconnexion</button></li>
                </ul>
            </div>
            <div>
            <div className="row">
                <table id="tab-ad" class="table table-hover table-dark">
                    <thead className="thead-dark">
                        <tr>
                        <th>Date</th>
                        <th>lieu</th>
                        <th>degre d'urgence</th>
                        <th>etat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.demandes.map(
                            demande =>
                        <tr key={demande.id}>
                            <td>{demande.date_D}</td>
                            <td>{demande.lieu}</td>
                            <td>{demande.degre_urgence}</td>
                            <td>{demande.etat}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            </div>
        </div> 
        )
    }
}
