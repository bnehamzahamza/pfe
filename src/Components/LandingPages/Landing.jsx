import React, { Component } from 'react'
import './Landing.css';

const info_emp = ['demandeur : ', <br />, '- passer une demande ', <br />, '- consulter les demandes '];
const info_dmg = ['DMG : ', <br />, '- décider pour les nouvelles demandes ', <br />, '- consulter les demandes en cours ', <br />, '- établir des statistiques '];
const info_res = ['Responsable : ', <br />, '- décider pour les nouvelles demandes '];
const info_ser = ['Service : ', <br />, '- décider pour les nouvelles demandes ', <br />, '- établir les besoins pour une demande ', <br />, '- cloturer une demande ', <br />, '- décider pour les nouvelles demande '];
export default class Landing extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            
        }
        this.versDmg = this.versDmg.bind(this);
        this.versRes = this.versRes.bind(this);
        this.versService = this.versService.bind(this);
        this.versEmp = this.versEmp.bind(this);
    }

    versEmp(){
        this.props.history.push('/login-emp');
    }
    
    versRes(){
        this.props.history.push('/login-res');
    }

    versDmg(){
        this.props.history.push('/login-dmg');
    }

    versService(){
        this.props.history.push('/login-sc');
    }

    showUse=(event) =>{
        switch(event) {
            case "employee" :
                this.setState({info:info_emp})
                break;
            case "Responsable" :
                this.setState({info:info_res})
                break;
            case "Dmg" :
                this.setState({info:info_dmg})
                break;
            
            default :
            this.setState({info:info_ser})
                break;
        }
    }

    render() {
        return (
            <div  id="land">
                <div>
                <h1>CHOISIR ESPACE </h1>
                <div className="container">
                    
                    <button className="button type1" onClick={() => {this.showUse("employee")}} onDoubleClick={() => {this.versEmp()}}>
                    Demandeur
                    </button>
                    
                    <button className="button type2" onClick={() => {this.showUse("Dmg")}} onDoubleClick={() => {this.versDmg()}}>
                    DMG
                    </button>
                    
                    
                    <button className="button type3" onClick={() => {this.showUse("Responsable")}} onDoubleClick={() => {this.versRes()}}>
                    Responsable
                    </button>
                    
                    <button className="button type2" onClick={() => {this.showUse("Service")}} onDoubleClick={() => {this.versService()}}>
                    Service
                    </button>
                    
                </div>
                </div >
                <div className="div_emp">
                   {this.state.info}
                </div>
            </div>
        )
    }
}
