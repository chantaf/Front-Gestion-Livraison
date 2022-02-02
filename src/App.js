import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Login from './Pages/Login';
import './App.css';

import AdminRoutes from './Routes/Admin.routes';
import ManagerRoutes from './Routes/Manager.routes';
import ResponsableRoutes from './Routes/Responsable.routes';
import ChauffeurRoutes from './Routes/Chauffeur.routes';


function App() {
  // const [cookies, setCookie] = useCookies();
  const [path, setPath] = useState({ url: 'dashboard' });
  useEffect(() => {
    if(window.location.pathname === '/Admin/Auth' || window.location.pathname === '/Manager/Auth' || window.location.pathname === '/Chauffeur/Auth' ||window.location.pathname === '/Responsable/Auth'  ){
      setPath({ url: window.location.pathname })
    }
  }, [])
  

  return (
    <div>
      <Router>
          {path?.url === '/Admin/Auth' && <Route exact path="/Admin/Auth"  component={Login} />}
          {path?.url === '/Manager/Auth' && <Route exact path="/Manager/Auth"  component={Login} />}
          {path?.url === '/Chauffeur/Auth' && <Route exact path="/Chauffeur/Auth"  component={Login} />}
          {path?.url === '/ResponsableRoutes/Auth' && <Route exact path="/ResponsableRoutes/Auth"  component={Login} />}
      </Router>
      <AdminRoutes />
      <ManagerRoutes />
      <ResponsableRoutes />
      <ChauffeurRoutes />
    </div>
  );
}

export default App;
