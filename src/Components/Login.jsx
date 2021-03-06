import React, { Component } from 'react'
import "./Login.css";
import EmployeeServices from '../Services/EmployeeServices';
import AuthEmp from '../Auth/AuthEmp';
import swal from 'sweetalert';

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        

        this.state = {
            id:'',
            login : '' ,
            mdp : '',
            employees : []



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


    logTest = (e) => {
        e.preventDefault();
        EmployeeServices.checkLog(this.state.login,this.state.mdp).then((res) => {
            let result = res.data
            if(result.id != null){
                var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
                var resCrypt = urlCrypt.cryptObj(result.id)
                console.log("id crypté => "+JSON.stringify(resCrypt))
                console.log("AuthenticatedBefore => "+JSON.stringify(AuthEmp.isAuthenticated()))
                AuthEmp.login(() => {
                    console.log("AuthenticatedAfter => "+JSON.stringify(AuthEmp.isAuthenticated()))
                    this.props.history.push(`/employee-land/${resCrypt}`);
                })

            }
            else {
                swal({
                    title: "alert!",
                    text: "pseudo ou mot de passe incorrects!",
                    icon: "warning",
                    button: "éssayer",
                  });
            } 
           }
            )

            
    }

    
   
    

        
            
    





    render() {
        return (
            <div className="container">
                        <form id="divLog">

                <h3 className="text-center">DEMANDEUR</h3>

                <div className="form-group">
                    <label>pseudo</label>
                    <input className="form-control" placeholder="nom" onChange={this.changeLogin} />
                </div>

                <div className="form-group">
                    <label>mot de passe</label>
                    <input type="password" className="form-control" placeholder="mdp"
                     onChange={this.changeMdp} />
                </div>


                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.logTest}>CONNEXION</button>
                <p className="forgot-password text-right">
                </p>
                </form>
                
            </div>
        )
    }
}
