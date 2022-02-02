import React, { useState, useEffect } from 'react';
import SideBar from '../Components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Commande from '../Pages/Commande'
import ResLivraison from '../Pages/Responsable';
import Manager from '../Pages/Manager';
import Vehicule from '../Pages/Vehicule';
import Chauffeur from '../Pages/Chauffeurs';
import { useCookies } from "react-cookie";
import Prime from '../Pages/Primes';

export default function AdminG() {
  // const [cookies, setCookie] = useCookies();
  const [path, setPath] = useState({ url: 'dashboard' });

  // console.log(cookies);
  const role = localStorage.getItem('role');



  return <div>
    {role=== 'Admin' && (
      <Router>
        <div className="App">
            <div className="d-flex align-items-stretch">
            <SideBar />
              <div className="page-holder bg-gray-100">
                <Route exact path="/" component={Home} />
                <Route exact path="/Manager" component={Manager} />
                <Route exact path="/Commande" component={Commande} />
                <Route exact path="/Chauffeur" component={Chauffeur} />
                <Route exact path="/Responsable" component={ResLivraison} />
                <Route exact path="/Prime" component={Prime} />
              </div>
            </div>
        </div>
      </Router>
    )}
  </div>;
}
