import React, { Component } from 'react'
import AuthDmg from '../../Auth/AuthDmg';
import DmgServices from '../../Services/DmgServices';
import swal from 'sweetalert';

export default class LoginDmg extends Component {
    constructor(props){
        super(props)
        this.state = {
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
        DmgServices.CheckLogDmg(this.state.login,this.state.mdp).then((res) => {
            let result = res.data
            if(result.id != null){
                console.log("AuthenticatedBefore => "+JSON.stringify(AuthDmg.isAuthenticated()))
                AuthDmg.login(() => {
                    console.log("AuthenticatedAfter => "+JSON.stringify(AuthDmg.isAuthenticated()))
                    this.props.history.push('/accueil-dmg');
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
        })
    }

    

    render() {
        return (
            <div>
                 <div className="container">
                        <form id="divLog">

                <h3 className="text-center">DMG</h3>

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
