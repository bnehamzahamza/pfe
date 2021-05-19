import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices';
import "./AdminMain.css";


export default class ListDemandeDmg extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees :[],
            id : '',
            accord_res: '',
            accord_dmg: ''

        }
        this.consulteDemande = this.consulteDemande.bind(this);
    }

    componentDidMount(){
        DemandeServices.getDemandeDmg().then((res) => {
            this.setState({employees:res.data});
        })
    }
    consulteDemande(id){
        this.props.history.push(`/detailsdmg/${id}`);
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
                        this.state.employees.map(
                            employees =>
                              
                                    <tr key={employees.id}>
                                    <td>{employees.date_D}</td>
                                    <td>{employees.lieu}</td>
                                    <td>{employees.degre_urgence}</td>
                                    <td>{employees.etat}</td>
                                    <td><button onClick={() =>this.consulteDemande(employees.id)} className="btn btn-info">Consulter</button>
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
