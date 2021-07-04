import React, { Component } from 'react'
import ServiceConcerneService from '../../Services/ServiceConcerneService';
import ConsulteParSc from './ConsulteParSc.jsx'
import '../DetailsSc.css'



export default class ConsulteService extends Component {
    constructor(props) {
        super(props);
        this.state= {
            Services:[],
            visible:false,
            id:''

        }
         
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versEncours = this.versEncours.bind(this);
        this.versStatistique = this.versStatistique.bind(this);
        this.VersCout = this.VersCout.bind(this);
        this.VersSc = this.VersSc.bind(this);
        this.consulteService = this.consulteService.bind(this);
        this.VersDep = this.VersDep.bind(this);
        this.versStat = this.versStat.bind(this);
        this.reset = this.reset.bind(this);
    }
    

    componentDidMount(){
        ServiceConcerneService.getService().then((res) => {
            this.setState({Services:res.data});
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


    VersCout(){
        this.props.history.push(`/statistique-dmg`)
    }
    VersSc(){
        this.props.history.push(`/statistique-dmg/sc`)
    }

    consulteService(id){
        
        this.setState({id:id})
        this.setState({visible:true})
        
    }

    VersDep(){
        this.props.history.push("/statistique-dmg/dep");
    }

    versStat(){
        this.props.history.push('/statistique-dmg/stat');
    }
    reset(){
        this.setState({visible:false})
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
                <div style={{width:"fit-content",display:"inline-block"}}>
                <tr>
                        <th>Nom</th>
                        <th>Action</th>
                    </tr>
                    
                    {this.state.Services.map(
                    service => 
                        <tr key={service.id}>
                        <td>{service.nom}</td>
                        <td><button id="DetailsButton" onClick={() =>this.consulteService(service.id)} className="btn btn-light">Details</button>
                        </td>
                    </tr>
                    
                    
                )}
               <button style={{float:"left",display:"inline-block"}} id="ButtonReset" onClick={() =>this.reset()} className="btn btn-light">reset</button>
                </div>
                <div style={{marginRight:"20%",float:"right",display:"inline-block"}}>
                    {this.state.visible ?<ConsulteParSc id={this.state.id}/>:null}    
                </div>
            </div>
        )
    }
}
