import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices';
import ServiceConcerneService from '../Services/ServiceConcerneService';

export default class AffectationSc extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id ,
           demande: [],
           service: ''

        }
        this.serviceChanger = this.serviceChanger.bind(this);
        this.affecterSc = this.affecterSc.bind(this)
    }

    componentDidMount(){
        DemandeServices.getDemandeById(this.state.id).then((res) => {
            this.setState({demande: res.data})
            console.log('Demande => '+JSON.stringify(this.state.demande));

        
        })
    }


    serviceChanger= (event) =>{
        this.setState({service: event.target.value});
    }

    affecterSc(nom,demande){
        ServiceConcerneService.getServiceByNom(nom,demande)
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <form id="div_all" className="container">
                <h3>service a affecter</h3>
                <input type="text" onChange={this.serviceChanger} />
                <button onClick={() => {this.affecterSc(this.state.service,this.state.demande)}}>verifier</button>
                </form>
            </div>
        )
    }
}
