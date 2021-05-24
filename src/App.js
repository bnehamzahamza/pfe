import './App.css';
import PassDemande from './Components/PassDemande';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Components/Login';
import AdminMain from './Components/AdminMain';
import DemandeDetails from './Components/DemandeDetails';
import ListDemandeRes from './Components/ListDemandeRes';
import ListDemandeDmg from './Components/ListDemandeDmg';
import DemandeDetailsResp from './Components/DemandeDetailsResp';
import DemandeDetailsDmg from './Components/DemandeDetailsDmg';
import AffectationSc from './Components/AffectationSc';
import PageSc from './Components/PageSc';
import DetailsSc from './Components/DetailsSc';
import Besoins from './Components/Besoins';
import Fourniture from './Components/Fourniture';
import Materiel from './Components/Materiel';
import Personnel from './Components/Personnel';






function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/" exact component={Login}></Route>
          <Route path ="/accueil/:id" exact component={PassDemande} ></Route>
          <Route path ="/admin" exact component={AdminMain} ></Route>
          <Route path ="/details/:id" exact component={DemandeDetails} ></Route>
          <Route path ="/demanderes" exact component={ListDemandeRes} ></Route>
          <Route path ="/demandedmg" exact component={ListDemandeDmg} ></Route>
          <Route path ="/detailsresp/:id" exact component={DemandeDetailsResp} ></Route>
          <Route path ="/detailsdmg/:id" exact component={DemandeDetailsDmg} ></Route>
          <Route path ="/affectationSc/:id" exact component={AffectationSc} ></Route>
          <Route path ="/pageSc/:id" exact component={PageSc} ></Route> 
          <Route path ="/details-sc/:id" exact component={DetailsSc}></Route>
          <Route path ="/besoins/:id" exact component={Besoins}></Route>
          <Route path ="/add-fourniture/:id" exact component={Fourniture}></Route>
          <Route path ="/add-materiel/:id" exact component={Materiel}></Route>
          <Route path ="/add-personnel/:id" exact component={Personnel}></Route>
      </Switch>
      </Router>
    </div>
  )
}

export default App;
