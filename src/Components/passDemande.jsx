import React, { Component } from 'react'
export default class passDemande extends Component {


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
        value={this.state.mdp}  onChange={this.changeMdp} />
    </div>


    <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.logTest}>Connexion</button>
    <p className="forgot-password text-right">
    </p>
    </form>
</div>
        )
    }
}
