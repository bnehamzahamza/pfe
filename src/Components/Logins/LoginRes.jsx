import React, { Component } from 'react'
import AuthRes from '../../Auth/AuthRes';
import ResponsableServices from '../../Services/ResponsableServices';
import swal from 'sweetalert';

export default class LoginRes extends Component {
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

    }

    changeMdp= (event) => {
        this.setState({mdp: event.target.value});
    }
    changeLogin= (event) => {
        this.setState({login: event.target.value});
    }

    logTest = (e) => {
        e.preventDefault();
        ResponsableServices.checkLog(this.state.login,this.state.mdp).then((res) => {
            let result = res.data
            if(result.id != null){
                var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
                var resCrypt = urlCrypt.cryptObj(result.id)
                console.log("id crypté => "+JSON.stringify(resCrypt))
                AuthRes.login(() => {
                    console.log("AuthenticatedAfter => "+JSON.stringify(AuthRes.isAuthenticated()))
                    this.props.history.push(`/demanderes/${resCrypt}`);
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
            <div>
                <div className="container">
                        <form id="divLog">

                <h3 className="text-center">RESPONSABLE</h3>

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
            </div>
        )
    }
}
