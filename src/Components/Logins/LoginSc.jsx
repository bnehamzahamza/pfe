import React, { Component } from 'react'
import AuthSc from '../../Auth/AuthSc'
import ServiceConcerneService from '../../Services/ServiceConcerneService'
import swal from 'sweetalert';

export default class LoginSc extends Component {
    constructor(props){
        super(props)
        this.state = {
            login:'',
            mdp:''
        }
        this.changeLogin = this.changeLogin.bind(this)
        this.changeMdp = this.changeMdp.bind(this)

    }

    changeLogin=(event) =>{
        this.setState({login:event.target.value})
    }
    changeMdp=(event) =>{
        this.setState({mdp:event.target.value})
    }

    logTest=(e) =>{
        e.preventDefault();
        ServiceConcerneService.checkLog(this.state.login,this.state.mdp).then((res) => {
            let result = res.data
            if(result.id != null){
                AuthSc.login(() => {
                    this.props.history.push(`/pageSc/${result.id}`);
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

                <h3 className="text-center">SERVICE CONCERNE
                </h3>

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
