import React, { useState, useEffect } from 'react';
import SideBar from '../Components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Commande from '../Pages/Commande'
import Vehicule from '../Pages/Vehicule';
import Chauffeur from '../Pages/Chauffeurs';
import { useCookies } from "react-cookie";
import Prime from '../Pages/Primes';

export default function ResLivraisons() {
  const [cookies, setCookie] = useCookies();
  const [path, setPath] = useState({ url: 'dashboard' });
  const role = localStorage.getItem('role');

  return <div>
      {role === 'Responsable' && (
          <Router>
           <div className="App">
                <div className="d-flex align-items-stretch">
                {path?.url === 'dashboard'  && <SideBar /> }
                  <div className="page-holder bg-gray-100">
                    <Route exact path="/Commande" component={Commande} />
                    <Route exact path="/Chauffeur" component={Chauffeur} />
                    <Route exact path="/Prime" component={Prime} /> 
                  </div>
                </div> 
            </div>
          </Router>
      )}
  </div>;
}
