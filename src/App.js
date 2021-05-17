import './App.css';
import PassDemande from './Components/PassDemande';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Components/Login';
import AdminMain from './Components/AdminMain';
import DemandeDetails from './Components/DemandeDetails';
import ListDemandeRes from './Components/ListDemandeRes';





function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/" exact component={Login}></Route>
          <Route path ="/accueil" exact component={PassDemande} ></Route>
          <Route path ="/admin" exact component={AdminMain} ></Route>
          <Route path ="/details/:id" exact component={DemandeDetails} ></Route>
          <Route path ="/resdemande" exact component={ListDemandeRes} ></Route>
      </Switch>
      </Router>
    </div>
  )
}

export default App;
