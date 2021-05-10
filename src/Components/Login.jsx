import React, { Component } from 'react'
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {} from 'react-bootstrap';
import EmployeeServices from '../Services/EmployeeServices';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nom : '' ,
            mdp : '',
            employees : []

        }
        this.changeMdp = this.changeMdp.bind(this);
        this.changeNom = this.changeNom.bind(this);
        this.logTest = this.logTest.bind(this);
    }


    changeMdp= (event) => {
        this.setState({mdp: event.target.value});
    }
    changeNom= (event) => {
        this.setState({nom: event.target.value});
    }

    logTest = (e) => {
        let tests = {nom : this.state.nom, poste : this.state.mdp};
        console.log('tests => ' + JSON.stringify(tests));

        EmployeeServices.checkLog(tests.nom,tests.mdp).then((res) =>
           {    this.setState({employees: res.data})
               this.props.history.push('/accueil');
        } 
            )

        
    }




    render() {
        return (
            <div className="container">
                        <form id="divLog">

                <h3 className="text-center">connexion</h3>

                <div className="form-group">
                    <label>pseudo</label>
                    <input className="form-control" placeholder="nom" value={this.state.nom} onChange={this.changeNom} />
                </div>

                <div className="form-group">
                    <label>mot de passe</label>
                    <input type="password" className="form-control" placeholder="mdp"
                    value={this.state.mdp} onChange={this.changeMdp} />
                </div>


                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.logTest}>Connexion</button>
                <p className="forgot-password text-right">
                </p>
                </form>
            </div>
        )
    }
}
