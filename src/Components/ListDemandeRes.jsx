import React, { Component } from 'react'
import DemandeServices from '../Services/DemandeServices';
import "./AdminMain.css";


export default class ListDemandeRes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees :[],
            id : ''

        }
        this.consulteDemande = this.consulteDemande.bind(this);
    }

    componentDidMount(){
        DemandeServices.getDemande().then((res) => {
            this.setState({employees: res.data})
           
        })
    }
    consulteDemande(id){
        this.props.history.push(`/details/${id}`);
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
                            <td><button onClick={() =>this.consulteDemande(employees.id)} className="btn btn-primary">Consulter</button>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}
