import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminMain from './Components/AdminMain';
import SideNavAdmin from './Components/SideNavAdmin';





function App() {
  return (
    <div>
      <SideNavAdmin />
      <div>
      <AdminMain />
      </div>
    </div>
  )
}

export default App;
