import React, { Component } from 'react'
import DemandeServices from '../../Services/DemandeServices';
import ServiceConcerneService from '../../Services/ServiceConcerneService';
import '../ConsulteParSc.css';

export default class ConsulteParSc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            en_cours:[],
            reporter:[],
            finis:[],
            totalF:0
            
        }

    }
    componentDidMount(){
        ServiceConcerneService.getDemandeBySc(this.state.id).then((res) => {
            let result = res.data
            console.log("id => "+JSON.stringify(this.state.id))
            DemandeServices.FiltreDemandeByEtat(result,"en cours de realisation").then((res) => {
                this.setState({en_cours:res.data})
            })
            DemandeServices.FiltreDemandeByEtat(result,"reporter").then((res) => {
                this.setState({reporter:res.data})
            })
            DemandeServices.FiltreDemandeByEtat(result,"finis").then((res) => {
                this.setState({finis:res.data})
                let total = 0
                this.state.finis.map( 
                  demande => {
                    total+= demande.frais
                    return this.setState({totalF:total})
                })
            })

            
        })

        
    }
    

    
    render() {
        return (
            <div>
            <div>
                <div className="row">
                    <div className="column">
                        
                        <table style={{border:"0px",textAlign:"center"}} className="table table-striped table-dark">
                        <thead>
                        <tr>
                        <th style={{fontWeight:"900",fontSize:"25px",width:"1%"}} scope="col">en cours</th>
                        <th style={{textAlign:"center"}} scope="col">Date</th>
                        <th style={{textAlign:"center"}} scope="col">etat</th>
                       
                        </tr>
                    </thead>
                    <tbody >
                        {
                        this.state.en_cours.map(
                            demande =>
                                    
                                    <tr key={demande.id}>
                                        <td></td>
                                    <td>{demande.date_D.slice(0,10)}</td>
                                    <td>{demande.etat}</td>
                                    
                                </tr>
                                
                            
                                )}  
                           
                    </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <h3>reporter</h3>
                        <table id="tab-ad" className="table">
                        <thead className="thead-dark">
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
                        <table id="tab-ad" className="table">
                        <thead className="thead-dark">
                        <tr>
                        <th>Date</th>
                        <th>etat</th>
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
                                    <td>{demande.frais}</td>
                                    
                                </tr>
                                
                            
                                )}  
                           
                    </tbody>
                        </table>
                    </div>
                </div>
                <div id="depense">  
                    <table className="table table-dark">
                    <tbody>
                        <tr>
                            <td>dépense totale</td>
                            <td>{this.state.totalF}</td>
                        </tr>
                    </tbody>
                    </table>
                    
                </div>
            </div>
            </div>
        )
    }
}
