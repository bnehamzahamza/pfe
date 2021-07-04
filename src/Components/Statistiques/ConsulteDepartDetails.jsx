import React, { Component } from 'react'
import BesoinsServices from '../../Services/BesoinsServices';
import DemandeServices from '../../Services/DemandeServices';

export default class ConsulteDepartDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            ListDem:[],
            en_cours:[],
            reporter:[],
            finis:[],
            totalF: 0
        }
        this.getDuree = this.getDuree.bind(this);
    }

    componentDidMount(){
        DemandeServices.getDemandeByDep(this.state.id).then((res) => {
            this.setState({ListDem:res.data})
            DemandeServices.FiltreDemandeByEtat(res.data,"en cours de realisation").then((res) => {
                this.setState({en_cours:res.data})
            })
            DemandeServices.FiltreDemandeByEtat(res.data,"reporter").then((res) => {
                this.setState({reporter:res.data})
            })
            DemandeServices.FiltreDemandeByEtat(res.data,"finis").then((res) => {
                let dems = res.data
                let resultt = res.data
                

                dems.map(dem => {
                    BesoinsServices.getBesoinsByDemandeId(dem).then((res) => {
                        let result = res.data
                        let dateDebut = dem.date_D
                        let dateFin = result.date_F
                        
                        BesoinsServices.getDateDiff(dateDebut.slice(0,10),dateFin.slice(0,10)).then((res) => {
                            let durr = res.data
                            console.log("diff => "+JSON.stringify(durr))
                            let result2 = {id:dem.id,date_D:dem.date_D,etat:dem.etat,frais:dem.frais,duree:durr}
                            this.setState(state => {
                                const list = state.finis.push(result2);
                           
                                return {
                                  list
                                };
                              });
                            console.log("list finale => "+JSON.stringify(this.state.finis))
                            
                        })
                    }
                    )
                    return this.state.finis;
                })
                
                
                resultt.map (dem => {
                   return this.setState({totalF:this.state.totalF+dem.frais})

                }
                )
            })
        })
    }

    getDuree(dem){
        BesoinsServices.getBesoinsByDemandeId(dem).then((res) => {
            let result = res.data
            let dateDebut = dem.date_D
            let dateFin = result.date_F
            console.log("diff => "+JSON.stringify(res.data))
            BesoinsServices.getDateDiff(dateDebut.slice(0,10),dateFin.slice(0,10)).then((res) => {
                console.log("diff => "+JSON.stringify(res.data))
                return res.data
                
            })
        }
        )
    }
    
    render() {
        return (
            <div>
                <div className="column">
                        <h3>en cours de realisation</h3>
                        <table id="tab-ad" className="table table-bordered">
                        <thead>
                        <tr>
                        <th>Date</th>
                        <th>etat</th>
                        <th>total</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.en_cours.map(
                            demande =>
                                    
                                    <tr key={demande.id}>
                                    <td>{demande.date_D.slice(0,10)}</td>
                                    <td>{demande.etat}</td>
                                    <td>{demande.frais}</td>
                                    
                                </tr>
                                
                            
                                )}  
                           
                    </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <h3>reporter</h3>
                        <table id="tab-ad" className="table table-bordered">
                        <thead>
                        <tr>
                        <th>Date</th>
                        <th>etat</th>
                      
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.reporter.map(
                            demande =>
                                    
                                    <tr key={demande.id}>
                                    <td>{demande.date_D.slice(0,10)}</td>
                                    <td>{demande.etat}</td>
                                   
                                </tr>
                                
                            
                                )}  
                           
                    </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <h3>finis</h3>
                        <table id="tab-ad" className="table table-bordered">
                        <thead>
                        <tr>
                        <th>Date</th>
                        <th>etat</th>
                        <th>duree/js</th>
                        <th>total</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.finis.map(
                            demande =>
                                    
                                    <tr key={demande.id}>
                                    <td>{demande.date_D.slice(0,10)}</td>
                                    <td>{demande.etat}</td>
                                    <td>{demande.duree}</td>
                                    <td>{demande.frais}</td>
                                    
                                </tr>
                                
                            
                                )}  
                           
                    </tbody>
                        </table>
                    </div>
                
                <div>
                    <h4>dépense totale : {this.state.totalF}</h4>
                    
                </div>
            </div>
        )
    }
}
