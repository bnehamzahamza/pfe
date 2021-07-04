import React, { Component } from 'react'
import DemandeServices from '../../Services/DemandeServices';
import swal from 'sweetalert';

export default class LandingDmg extends Component {
    constructor(props) {
        super(props);
        this.state= {
            employees :[],
            id : '',
            accord_res: '',
            accord_dmg: '',
            demande:{}
        }
        

        
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versEncours = this.versEncours.bind(this);
        this.versStatistique = this.versStatistique.bind(this);
        this.consulteDemande = this.consulteDemande.bind(this);
    }

    versEncours(){
        this.props.history.push(`/accueil-dmg/en-cours`);
    }

    versNouvelles(){
        this.props.history.push(`/accueil-dmg`);
    }


    versStatistique(){
        this.props.history.push('/statistique-dmg');
    }

    componentDidMount(){
        DemandeServices.getDemandeDmg().then((res) => {
            this.setState({employees:res.data});
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
                        DemandeServices.acceptDmg(id,this.state.demande).then(() => {
                            this.props.history.push(`/affectationSc/${id}`)
                        });
                        break;


                      case "cancel":
                        DemandeServices.deleteDemande(id).then(() => 
                        this.props.history.push('/accueil-dmg')
                        );
                        break;
                    

                      default:
                        this.props.history.push(`/accueil-dmg`)

                  }

              })
        })
    }
    



    
    render() {
        return (
            <div>
                <div>
                    <ul>
                    <li><button onClick={()=> {this.versEncours()}}>demandes en cours</button></li>
                    <li><button  class="active" onClick={()=> {this.versNouvelles()}}>nouvelles demandes</button></li>
                    <li><button onClick={()=> {this.versStatistique()}}>vers statistiques</button></li>
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
                        <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.employees.map(
                            employees =>
                              
                                    <tr key={employees.id}>
                                    <td>{employees.date_D}</td>
                                    <td>{employees.lieu}</td>
                                    <td>{employees.degre_urgence}</td>
                                    <td>{employees.etat}</td>
                                    <td><button onClick={() =>this.consulteDemande(employees.id)} className="btn btn-info">Consulter</button>
                                    </td>
                                </tr>
                                
                            
                                )}  
                           
                    </tbody>
                </table>
            </div>

                </div>
            </div>
        )
    }
}
