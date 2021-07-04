import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices';
import './ConsulteGen.css';

export default class DemandeEnCours extends Component {
    constructor(props) {
        super(props);
        this.state= {
            demandes:[]
        }

        this.versEncours = this.versEncours.bind(this);
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versStatistique = this.versStatistique.bind(this);
    }

    componentDidMount(){
        DemandeServices.getDemandeByEtat("en cours de realisation").then((res) => {
            this.setState({demandes:res.data});
        })
    }

    versEncours(){
        this.props.history.push(`/accueil-dmg/en-cours`);
    }

    versNouvelles(){
        this.props.history.push(`/accueil-dmg`)
    }

    versStatistique(){
        this.props.history.push('/statistique-dmg')
    }

    
    render() {
        return (
            <div>
                 <div>
                <ul>
                    <li><button class="active" onClick={()=> {this.versEncours()}}>demandes en cours</button></li>
                    <li><button onClick={()=> {this.versNouvelles()}}>nouvelles demandes</button></li>
                    <li><button onClick={()=> {this.versStatistique()}}>vers statistiques</button></li>
                    </ul>
                </div>
                <div>
            <div className="row">
                <table id="tab-ad" className="table table-striped table-dark">
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
