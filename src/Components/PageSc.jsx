import React, { Component } from 'react'
import ServiceConcerneService from '../Services/ServiceConcerneService'

export default class PageSc extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id:this.props.match.params.id,
            demandes: []

        }
        this.consulteDemande = this.consulteDemande.bind(this);

    }

    componentDidMount(){
        ServiceConcerneService.getDemandeBySc(this.state.id).then((res) => 
        {
            this.setState({demandes:res.data});
        }
        )
    }

    consulteDemande(id){
        this.props.history.push(`/details-sc/${id}`);
    }


    render() {
        return (
            <div className="container">
            <div className="row">
                <table id="tab-ad" className="table table-bordered">
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
                        this.state.demandes.map(
                            demande =>
                              
                                    <tr key={demande.id}>
                                    <td>{demande.date_D}</td>
                                    <td>{demande.lieu}</td>
                                    <td>{demande.degre_urgence}</td>
                                    <td>{demande.etat}</td>
                                    <td><button onClick={() =>this.consulteDemande(demande.id)} className="btn btn-info">Consulter</button>
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
