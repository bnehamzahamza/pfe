import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {} from 'react-bootstrap';

export default class passDemande extends Component {


    render() {
        return (
            <div className="container">
                <form>
                    <label>
                        destinataire
                    </label>
                    <input type="text" className="form-control" value="DMG" />
                    <label>
                        dégre d'urgence
                    </label>
                    <input type="text" className="form-control" />
                    <label>
                        lieu
                    </label>
                    <input type="text" className="form-control" />
                    <label>
                        date
                    </label>
                    <input type="date" />

                </form>
            </div>
        )
    }
}
