import React, { Component } from 'react'
import "./Login.css";
import EmployeeServices from '../Services/EmployeeServices';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login : '' ,
            mdp : '',
            employees : [],
            isLogged : false

        }
        this.changeMdp = this.changeMdp.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.logTest = this.logTest.bind(this);
    }



    changeMdp= (event) => {
        this.setState({mdp: event.target.value});
    }
    changeLogin= (event) => {
        this.setState({login: event.target.value});
    }


    logTest = () => {
        
        EmployeeServices.checkLog(this.state.login,this.state.mdp).then((res) => {
            let result = res.data;
            if(result === true)  {
                this.props.history.push("/accueil");
            }}
            )
            

        }

        
            
    





    render() {
        return (
            <div className="container">
                        <form id="divLog">

                <h3 className="text-center">connexion</h3>

                <div className="form-group">
                    <label>pseudo</label>
                    <input className="form-control" placeholder="nom" onChange={this.changeLogin} />
                </div>

                <div className="form-group">
                    <label>mot de passe</label>
                    <input type="password" className="form-control" placeholder="mdp"
                     onChange={this.changeMdp} />
                </div>


                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.logTest}>Connexion</button>
                <p className="forgot-password text-right">
                </p>
                </form>
            </div>
        )
    }
}
