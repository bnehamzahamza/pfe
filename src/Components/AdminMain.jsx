import React, { Component } from 'react'
import EmployeeServices from '../Services/EmployeeServices';
import "./AdminMain.css";


export default class AdminMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees :[]

        }
    }

    componentDidMount(){
        EmployeeServices.getEmployees().then((res) => {
            this.setState({employees: res.data})
        })
    }


    render() {
        return (
            <div className="row">
                <table id="tab-ad" className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                        <th>émeteur</th>
                        <th>departement</th>
                        <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.employees.map(
                            employees =>
                        <tr key={employees.id}>
                            <td>{employees.firstName}</td>
                            <td>{employees.lastName}</td>
                            <td>{employees.post}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
