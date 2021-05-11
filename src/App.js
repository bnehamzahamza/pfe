import './App.css';
import PassDemande from './Components/PassDemande';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Components/Login';
import AdminMain from './Components/AdminMain';
import DemandeDetails from './Components/DemandeDetails';





function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/" exact component={Login}></Route>
          <Route path ="/accueil" exact component={PassDemande} ></Route>
          <Route path ="/admin" exact component={AdminMain} ></Route>
          <Route path ="/details/:id" exact component={DemandeDetails} ></Route>
      </Switch>
      </Router>
    </div>
  )
}

export default App;
