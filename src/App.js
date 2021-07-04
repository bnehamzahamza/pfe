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
import LandingEmployee from './Components/LandingPages/LandingEmployee';
import LandingServiceCon from './Components/LandingPages/LandingServiceCon';
import DemandeRep from './Components/DemandeRep';
import LoginRes from './Components/Logins/LoginRes';
import {ProtectedRoute} from './Auth/ProtectedRoute';
import { ProtectedRouteRes } from './Auth/ProtectedRouteRes';
import LoginDmg from './Components/Logins/LoginDmg';
import { ProtectedRouteDmg } from './Auth/ProtectedRouteDmg';
import LoginSc from './Components/Logins/LoginSc';
import { ProtectedRouteSc } from './Auth/ProtectedRouteSc';
import LandingDmg from './Components/LandingPages/LandingDmg';
import StatistiqueDmg from './Components/StatistiqueDmg';
import ConsulteDdes from './Components/Statistiques/ConsulteDdes';
import ConsulteService from './Components/Statistiques/ConsulteService';
import ConsulteParSc from './Components/Statistiques/ConsulteParSc';
import ConsulteDepart from './Components/Statistiques/ConsulteDepart';
import ConsulteDepartDetails from './Components/Statistiques/ConsulteDepartDetails';
import ConsulteGen from './Components/Statistiques/ConsulteGen';
import Landing from './Components/LandingPages/Landing';
import DemandeEnCours from './Components/DemandeEnCours';
import ClotureParDate from './Components/Statistiques/ClotureParDate';






function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/login-emp" exact component={Login}></Route>
          <ProtectedRoute exact path ="/accueil/:id" component={PassDemande} />
          <Route path ="/admin" exact component={AdminMain} ></Route>
          <Route path ="/details/:id" exact component={DemandeDetails} ></Route>
          <ProtectedRouteRes exact path ="/demanderes/:id" component={ListDemandeRes} />
          <ProtectedRouteDmg path ="/demandedmg" exact component={ListDemandeDmg} />
          <Route path ="/detailsresp/:id1/:id" exact component={DemandeDetailsResp} ></Route>
          <ProtectedRouteDmg path ="/detailsdmg/:id" exact component={DemandeDetailsDmg} />
          <Route path ="/affectationSc/:id" exact component={AffectationSc} ></Route>
          <ProtectedRouteSc path ="/pageSc/:id" exact component={LandingServiceCon} />
          <ProtectedRouteSc path ="/details-sc/:id" exact component={DetailsSc} />
          <Route path ="/besoins/:id" exact component={Besoins}></Route>
          <Route path ="/add-fourniture/:id" exact component={Fourniture}></Route>
          <Route path ="/add-materiel/:id" exact component={Materiel}></Route>
          <Route path ="/add-personnel/:id" exact component={Personnel}></Route>
          <ProtectedRoute exact path ="/employee-land/:id" component={LandingEmployee} />
          <Route path ="/sc-nouvelle/:id" exact component={PageSc}></Route>
          <Route path ="/sc-reporter/:id" exact component={DemandeRep}></Route>
          <Route path ="/login-res" exact component={LoginRes}></Route>
          <Route exact path ="/login-dmg" component={LoginDmg} />
          <Route exact path="/login-sc" component={LoginSc} />
          <ProtectedRouteDmg exact path="/accueil-dmg" component={LandingDmg} />
          <ProtectedRouteDmg exact path="/statistique-dmg" component={StatistiqueDmg} />
          <ProtectedRouteDmg exact path="/statistique-dmg/consulte/:id" component={ConsulteDdes} />
          <ProtectedRouteDmg exact path="/statistique-dmg/sc" component={ConsulteService} />
          <ProtectedRouteDmg exact path="/statistique-dmg/sc/:id" component={ConsulteParSc} />
          <ProtectedRouteDmg exact path="/statistique-dmg/dep" component={ConsulteDepart} />
          <ProtectedRouteDmg exact path="/statistique-dmg/dep/:id" component={ConsulteDepartDetails} />
          <ProtectedRouteDmg exact path="/statistique-dmg/stat" component={ConsulteGen} />
          <ProtectedRouteDmg exact path="/accueil-dmg/en-cours" component={DemandeEnCours} />
          <Route exact path="/cloture" component={ClotureParDate} />
          <Route exact path="/" component={Landing} />
      </Switch>
      </Router>
    </div>
  )
}

export default App;
