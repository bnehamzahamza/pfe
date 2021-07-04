import React, { Component } from 'react'
import EmployeeServices from '../../Services/EmployeeServices';
import ConsulteDepartDetails from './ConsulteDepartDetails.jsx'

export default class ConsulteDepart extends Component {
    constructor(props) {
        super(props);
        this.state= {

            ListDeps:[],
            visible:false,
            id:''
        }
        
        this.versNouvelles = this.versNouvelles.bind(this);
        this.versEncours = this.versEncours.bind(this);
        this.versStatistique = this.versStatistique.bind(this);
        this.VersCout = this.VersCout.bind(this);
        this.VersSc = this.VersSc.bind(this);
        this.VersDep = this.VersDep.bind(this);
        this.consulteDep = this.consulteDep.bind(this);
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
        EmployeeServices.getDeps().then((res) => {
            this.setState({ListDeps:res.data});
        })
    }
    consulteDep(depart){
       
        this.setState({id:depart})
        this.setState({visible:true})

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
                            <button onClick={() =>{this.VersCout()}}>couts</button>
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
                    {this.state.ListDeps.map(
                    list => 
                        <tr key={list}>
                        <td>{list}</td>
                        <td><button id="DetailsButton" onClick={() =>this.consulteDep(list)} className="btn btn-light">Details</button>
                        </td>
                    </tr>
                    
                )}
                <button style={{float:"left",display:"inline-block"}} id="ButtonReset" onClick={() =>this.reset()} className="btn btn-light">reset</button>
                </div>
                <div style={{float:"right",display:"inline-block"}}>
                    {this.state.visible ?<ConsulteDepartDetails id={this.state.id}/>:null}    
                </div>
            </div>
        )
    }
}
