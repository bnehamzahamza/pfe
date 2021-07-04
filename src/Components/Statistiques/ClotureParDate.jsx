import React, { Component } from 'react'
import BesoinsServices from '../../Services/BesoinsServices';
import DemandeServices from '../../Services/DemandeServices';
import './ClotureParDate.css'

export default class ClotureParDate extends Component {
    constructor(props) {
        super(props);
        this.state= {
            demandes:[],
            date:''
        }
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versEncours = this.versEncours.bind(this);
        this.versStatistique = this.versStatistique.bind(this);
        this.VersCout = this.VersCout.bind(this);
        this.VersSc = this.VersSc.bind(this);
        this.consulteService = this.consulteService.bind(this);
        this.VersDep = this.VersDep.bind(this);
        this.versStat = this.versStat.bind(this);
        this.changeDate = this.changeDate.bind(this);
        
    }

    componentDidMount=() =>{
        DemandeServices.getDemandeByEtat("finis").then((res) =>{
            this.setState({demandes:res.data})
            let demdem = []
            
            this.state.demandes.map(
                dem => {
                    
                    
                    BesoinsServices.getBesoinsByDemandeId(dem).then((res) => {
                        let bes = res.data
                        
                        BesoinsServices.getCostFourniture(bes).then((res) => {
                           let FraisFourniture = res.data;
                           BesoinsServices.getCostMateriel(bes).then((res) => {
                            let FraisMat = res.data;
                            BesoinsServices.getCostPersonnel(bes).then((res) => {
                                let FraisPer = res.data
                                let demNew = {id:dem.id,lieu:dem.lieu,FraisMat:FraisMat,FraisPer:FraisPer,FraisFr:FraisFourniture,fraisTotal:dem.frais}
                        demdem.push(demNew)
                        this.setState({demandes:demdem})
                            })
                        })
                        })
                        
                }
            )
            
            return true;
            }
            )
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
    consulteDemande(id){
        this.props.history.push(`/statistique-dmg/consulte/${id}`)
    }

    VersCout(){
        this.props.history.push(`/statistique-dmg`)
    }
    VersSc(){
        this.props.history.push(`/statistique-dmg/sc`)
    }

    consulteService(id){
        this.props.history.push(`/statistique-dmg/sc/${id}`)
    }

    VersDep(){
        this.props.history.push("/statistique-dmg/dep");
    }

    versStat(){
        this.props.history.push('/statistique-dmg/stat');
    }

    changeDate(e){
        this.setState({date:e.target.value});
        console.log("value => "+JSON.stringify(this.state.date));
    }





    
    render() {
        return (
            <div>
                <div id ="navb">
                    <ul>
                    <li><button onClick={()=> {this.versEncours()}}>demandes en cours</button></li>
                    <li><button  onClick={()=> {this.versNouvelles()}}>nouvelles demandes</button></li>
                    <li><button class="active" onClick={()=> {this.versStatistique()}}>vers statistiques</button></li>
                    
                    </ul>
                </div>

                <div>
                    <ul>
                    <li><button onClick={() =>{this.VersCout()}}>couts</button></li>
                    <li><button onClick={() =>{this.VersSc()}}>Service</button></li>
                    <li><button onClick={() =>{this.VersDep()}}>departement</button></li>
                    <li><button onClick={() =>{this.versStat()}}>statistiques</button></li>
                    <li><button class="active" >Clotures</button></li>
                    </ul>
                </div>
                <div>
                    <h6>par mois</h6>
                    <select value={this.state.date} onChange={this.changeDate}>
                    <option value='0'>toute l'année</option>
                    <option value='1'>janvier</option>
                    <option value='2'>février</option>
                    <option value='3'>mars</option>
                    <option value='4'>avril</option>
                    <option value='5'>mai</option>
                    <option value='6'>juin</option>
                    <option value='7'>juillet</option>
                    <option value='8'>aout</option>
                    <option value='9'>septembre</option>
                    <option value='10'>octobre</option>
                    <option value='11'>novembre</option>
                    <option value='12'>décembre</option>        
                    </select>

                    
                </div>
                <div>
                    <div id="tab-cloture" className="column">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>désignations</th>
                                    <th>code projet</th>
                                    <th>personnel</th>
                                    <th>fourniture</th>
                                    <th>matériel</th>
                                    <th>total</th>
                                </tr>
                               
                            </thead>
                            <tbody> {
                                this.state.demandes.map(
                                    demAfter => 
                                    <tr>
                                    <td>{demAfter.lieu}</td>
                                    <td>{demAfter.id}</td>
                                    <td>{demAfter.FraisPer}</td>
                                    <td>{demAfter.FraisFr}</td>
                                    <td>{demAfter.FraisMat}</td>
                                    <td>{demAfter.fraisTotal}</td>
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
