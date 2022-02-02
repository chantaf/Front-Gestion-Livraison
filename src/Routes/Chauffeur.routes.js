import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useCookies } from "react-cookie";
import ChauffeurPage from '../Pages/Chauffeur';

export default function Livreur() {
    const [cookies, setCookie] = useCookies();
    const [path, setPath] = useState({ url: 'dashboard' });
    const role = localStorage.getItem('role');

    return <div>
        {role === 'Chauffeur' && (
          <Router>
           <div className="App">
                <div className="d-flex align-items-stretch">
                  <div className="page-holder bg-gray-100">
                    <Route exact path="/Chauffeur" component={ChauffeurPage } />
                  </div>
                </div> 
            </div>
          </Router>
      )}
    </div>;
}
