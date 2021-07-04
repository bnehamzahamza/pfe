import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices';
import './StatistiqueDmg.css'

export default class StatistiqueDmg extends Component {
    constructor(props) {
        super(props);
        this.state= {
            DemandesF:[]


        }
        
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versEncours = this.versEncours.bind(this);
        this.versStatistique = this.versStatistique.bind(this);
        this.consulteDemande = this.consulteDemande.bind(this);
        this.VersCout = this.VersCout.bind(this);
        this.VersSc = this.VersSc.bind(this);
        this.VersDep = this.VersDep.bind(this);
        this.versStat = this.versStat.bind(this);
    }


    componentDidMount(){
        DemandeServices.getDemandeByEtat('finis').then((res) => {
            this.setState({DemandesF:res.data});
        })
    }

    versEncours(){
        this.props.history.push(`/accueil-dmg/en-cours`);
    }

    versNouvelles(){
        this.props.history.push(`/accueil-dmg`);
    }

    

    versStatistique(){
        this.props.history.push('/statistique-dmg')
    }
    consulteDemande(id){

        
        this.props.history.push(`/statistique-dmg/consulte/${id}`)
    }

    VersCout(){
        this.props.history.push(`/statistique-dmg`)
    }
    VersSc(){
        this.props.history.push(`/statistique-dmg/sc`)
    }

    VersDep(){
        this.props.history.push("/statistique-dmg/dep");
    }

    versStat(){
        this.props.history.push('/statistique-dmg/stat');
    }
    
    render() {
        return (
            <div style={{backgroundColor:"#F3F3F3"}}>
               <div>
               <thead className="thead-dark">
                        <tr id="tr-nav">
                        <th id="th-nav"><button id="btn-nav" onClick={() => {this.versEncours()}}>demandes en cours</button></th>
                        <th id="th-nav"><button id="btn-nav" onClick={()=> {this.versNouvelles()}}>nouvelles demandes</button></th>
                        <th id="thth">
                        <div class="dropdown">
                            <button id="active" class="dropbtn">vers statistiques</button>
                            <div class="dropdown-content">
                            <button onClick={() =>{this.VersCout()}}>demande</button>
                            <button onClick={() =>{this.VersSc()}}>Service</button>
                            <button class="active" onClick={() =>{this.VersDep()}}>departement</button>
                            <button onClick={() =>{this.versStat()}}>statistiques</button>
                            </div>
                            </div>
                        </th>
                        </tr>
                    </thead>
               </div>
                        <div class="table-responsive">
                        <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Lieu</th>
                        <th scope="col">Degré_urgence</th>
                        <th scope="col">Etat</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                    {this.state.DemandesF.map(
                                        demande => 
                                            <tr key={demande.id}>
                                            <td >{demande.date_D}</td>
                                            <td>{demande.lieu}</td>
                                            <td>{demande.degre_urgence}</td>
                                            <td>{demande.etat}</td>
                                            <td><button id="affectButton" onClick={() =>this.consulteDemande(demande.id)} className="btn btn">Consulter</button>
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
