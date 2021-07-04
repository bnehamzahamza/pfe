import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices';
import ResponsableServices from '../Services/ResponsableServices';
import "./Dropdown.css";
import swal from 'sweetalert';
import * as AiIcons from 'react-icons/ai';
import AuthRes from '../Auth/AuthRes';

export default class ListDemandeRes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees :[],
            id : '',
            accord_res: '',
            accord_dmg: '',
            link_id : this.props.match.params.id,
            demande: {}

        }
        this.consulteDemande = this.consulteDemande.bind(this);
        this.versDeconnexion = this.versDeconnexion.bind(this);
    }

    componentDidMount(){
        let urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF')
        let backagain = urlCrypt.decryptObj(this.state.link_id)
        ResponsableServices.getDemandesById(backagain).then((res) => {
            let result = res.data
        DemandeServices.getDemandeResById(result).then((res) => {
            this.setState({employees:res.data})
            console.log('     => =>'+JSON.stringify(this.state.employees));
        })
        })
        
    }
    consulteDemande(id){
        DemandeServices.getDemandeById(id).then((res) => {
            this.setState({demande:res.data})
            swal({
                title: "décider ?",
                text: this.state.demande.description,
                icon: "info",
                buttons: {
                    cancel: "Refuser!",
                    accept: "accepter",
                }
                
              }).then((result) =>{
                  switch(result){
                      case "accept":
                        DemandeServices.acceptResp(id,this.state.demande).then(() => {
                            this.props.history.push(`/demanderes/${this.state.link_id}`)
                        })
                        break;


                      case "cancel":
                        DemandeServices.deleteDemande(id).then(() => 
                            this.props.history.push(`/demanderes/${this.state.link_id}`)
                            )
                        break;
                    

                      default:
                        this.props.history.push(`/demanderes/${this.state.link_id}`)

                  }

              })
        })
    }


    versDeconnexion(){
        AuthRes.logout(() => {
            console.log("AuthenticatedAfter => "+JSON.stringify(AuthRes.isAuthenticated()))
            this.props.history.push(`/login-res`);
        })
    }

    render() {
        return (
            <div>
                   
            <div className="row">
                <table id="tab-ad" className="table table-hover table-dark">
                    <thead className="thead-dark">
                        <tr>
 
                        <th>Date</th>
                        <th>lieu</th>
                        <th>degre d'urgence</th>
                        <th>etat</th>
                        <th id="thth">action
                        <div id="dropdownRes">
                        <button id="buttonRes">
                        <AiIcons.AiOutlineUser />
                        </button>
                    <div id="contentRes">
                        <button onClick={() => {this.versDeconnexion()}}>Déconnexion</button>
                    </div>
                    </div>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.employees.map(
                            employees =>
                              
                                    <tr key={employees.id}>
                                    <td>{employees.date_D.slice(0,10)}</td>
                                    <td>{employees.lieu}</td>
                                    <td>{employees.degre_urgence}</td>
                                    <td>{employees.etat}</td>
                                    <td><button id="affectButton" onClick={() =>this.consulteDemande(employees.id)} className="btn btn-dark">Consulter</button>
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
