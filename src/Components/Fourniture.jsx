import React, { Component } from 'react'
import BesoinsServices from '../Services/BesoinsServices';

export default class Fourniture extends Component {
    constructor(props) {
        super(props)

        this.changeNom = this.changeNom.bind(this);
        this.changeQte = this.changeQte.bind(this);
        
        this.autreF = this.autreF.bind(this);    


        this.state = {
            id : this.props.match.params.id ,
            demande: [],
            Nom:'',
            qte:''

        }
           
    }


    changeNom= (event) =>{
        this.setState({Nom:event.target.value});
    }

    changeQte= (event) =>{
        this.setState({qte:event.target.value});
    }


    autreF = (e) => {
        e.preventDefault();
        let Fourniture = {nom:this.state.Nom,qte:this.state.qte}
        console.log("fourniture => "+JSON.stringify(Fourniture));
        BesoinsServices.setFournitureByBesoinId(this.state.id,Fourniture).then((res)=>{
            let resultat = res.data
            let demande = resultat.demande_id
            this.props.history.push(`/besoins/${demande.id}`);
        })
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                    <label>Nom  du fourniture</label>
                    <input type="text" value={this.state.Nom} onChange={this.changeNom} className="form-control" />
                    </div>
                    <div>
                    <label>quantité  du fourniture</label>
                    <input type="text" value={this.state.qte} onChange={this.changeQte} className="form-control" />
                    </div>
                    <div>
                        
                        <button className="btn btn-success" onClick={this.autreF}>submit</button>
                    </div>

                </form>
            </div>
        )
    }
}
