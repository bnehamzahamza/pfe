import React, { Component } from 'react'
import DemandeServices from '../../Services/DemandeServices';
import ServiceConcerneService from '../../Services/ServiceConcerneService';
import  '../ConsulteGen.css';

export default class ConsulteGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListService:[],
            selectedService:"All",
            triDate:"Ascendent",
            etat:"All",
            ListDemande:[]

        }

        
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versEncours = this.versEncours.bind(this);
        this.versStatistique = this.versStatistique.bind(this);
        this.VersCout = this.VersCout.bind(this);
        this.VersSc = this.VersSc.bind(this);
        this.VersDep = this.VersDep.bind(this);
        this.versStat = this.versStat.bind(this);
        this.changeService = this.changeService.bind(this);
        this.changeDateTri = this.changeDateTri.bind(this);
        this.changeEtat = this.changeEtat.bind(this);
        this.Tri = this.Tri.bind(this);
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
    componentDidMount(){
        ServiceConcerneService.getService().then((res) => {
            this.setState({ListService:res.data});
        })
    }

    changeService(e){
        this.setState({selectedService:e.target.value});
        
    }
    changeDateTri(e){
        this.setState({triDate:e.target.value});
        console.log("date selected => "+JSON.stringify(this.state.triDate));
        
    }
    changeEtat(e){
        this.setState({etat:e.target.value});
    }
    Tri(){
        if(this.state.selectedService === "All"){
            if(this.state.etat === "All"){
                DemandeServices.getDemande().then((res) =>{
                    let Demandes = res.data
                    if(this.state.triDate ==="Ascendent"){
                            DemandeServices.TriDemandeAsc(Demandes).then((res) =>{
                                this.setState({ListDemande:res.data});
                                console.log('Asc');
                            });
                        }
                           
                        
                    else{
                        DemandeServices.TriDemandeDesc(Demandes).then((res) =>{
                            this.setState({ListDemande:res.data});
                            console.log('Desc');
                        });
                    }
                    
                })
            }
            else {
                DemandeServices.getDemande().then((res) =>{
                    let Demandes = res.data
                    DemandeServices.FiltreDemandeByEtat(Demandes,this.state.etat).then((res) =>{
                        let Dem = res.data
                        console.log(JSON.stringify(Dem))
                        if(this.state.triDate ==="Ascendent"){
                                DemandeServices.TriDemandeAsc(Dem).then((res) =>{
                                    this.setState({ListDemande:res.data});
                                    console.log('Asc');
                                });
                            }
                               
                            
                        else{
                            DemandeServices.TriDemandeDesc(Dem).then((res) =>{
                                this.setState({ListDemande:res.data});
                                console.log('Desc');
                            });
                        }
    
    
                        })
                })
            }
        }
        else {
            if(this.state.etat === "All"){
                ServiceConcerneService.getDemandes(this.state.selectedService).then((res) =>{
                    let Demandes = res.data
                    if(this.state.triDate ==="Ascendent"){
                        DemandeServices.TriDemandeAsc(Demandes).then((res) =>{
                            this.setState({ListDemande:res.data});
                            console.log('Asc');
                        });
                    }
                       
                    
                else{
                    DemandeServices.TriDemandeDesc(Demandes).then((res) =>{
                        this.setState({ListDemande:res.data});
                        console.log('Desc');
                    });
                }

                })
            }
            else {
            ServiceConcerneService.getDemandes(this.state.selectedService).then((res) =>{
                let Demandes = res.data
                DemandeServices.FiltreDemandeByEtat(Demandes,this.state.etat).then((res) =>{
                    let Dem = res.data
                    console.log(JSON.stringify(Dem))
                    if(this.state.triDate ==="Ascendent"){
                            DemandeServices.TriDemandeAsc(Dem).then((res) =>{
                                this.setState({ListDemande:res.data});
                                console.log('Asc');
                            });
                        }
                           
                        
                    else{
                        DemandeServices.TriDemandeDesc(Dem).then((res) =>{
                            this.setState({ListDemande:res.data});
                            console.log('Desc');
                        });
                    }


                    })
                })
            }
            
        }
    }

    consulteDemande(id){
        this.props.history.push(`/statistique-dmg/consulte/${id}`);
    }

    


    render() {
        return (
            <div>
                 <div style={{backgroundColor:"#F3F3F3"}}>
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
               <div class="container" style={{margin:"1.5% 0% 1.5% 10%"}}>
       <div class="row"> 
        <div class="col-md-3">
                        <li>
                            <h5 style={{fontWeight:"500",color:"#33B5E5"}}>Par date : </h5>
                            <br/>
                            <select onChange={this.changeDateTri} id="select">
                                <option>Ascendent</option>
                                <option>descendent</option>
                            </select>
                        </li>
                        </div> 
        <div class="col-md-3">
                        <li>
                            <h5 style={{fontWeight:"500",color:"#33B5E5"}}>Par service</h5>
                            <br />
                            <select value={this.state.selectedService} onChange={this.changeService} id="select" >
                                <option>All</option>
                                {
                                    this.state.ListService.map(services => (
                                        <option>{services.nom}</option>
                                    )
                                        
                                        )

                                }
          
                            </select>
                        </li>
                        </div>
        <div class="col-md-3">
                        <li>
                            <h5 style={{fontWeight:"500",color:"#33B5E5"}}>Par état</h5>
                            <br />
                            <select  onChange={this.changeEtat} id="select">
                            <option>All</option>
                                <option>finis</option>
                                <option>reporter</option>
                                <option>en cours d'etude</option>
                                <option>en cours de realisation</option>
                            </select>
                        </li>
                        </div> 
        <div class="col-md-3">
                        <li>
                            <button onClick={() => {this.Tri()}} id="affectButton" style={{marginTop:"5%"}} className='btn btn-light'>trier</button>
                        </li>
                 </div>
            </div>
        </div>

                <div id="tab_tri">
                <div className="row">
                <table id="tab-ad" className="table table-striped table-dark">
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
                        this.state.ListDemande.map(
                            demande =>
                                
                                    <tr key={demande.id}>
                                    <td>{demande.date_D.slice(0,10)}</td>
                                    <td>{demande.lieu}</td>
                                    <td>{demande.degre_urgence}</td>
                                    <td>{demande.etat}</td>
                                    <td><button id="affectButton" onClick={() =>this.consulteDemande(demande.id)} className="btn btn-dark">Consulter</button>
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
