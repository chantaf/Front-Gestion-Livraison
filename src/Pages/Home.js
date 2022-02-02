import React, { useState, useEffect } from 'react';
import { IoEllipseSharp } from "react-icons/io5";
import Stats from '../Components/Statistique';
import '../Css/Style.css'
import axios from "axios"


export default function Home() {
    const [ResLivraison , setResLivraison] = useState([]);
    const [Comandes , setComandes] = useState([]);
    const [Livreurs , setLivreurs] = useState([]);
    const [Managers , setManagers] = useState([]);

    useState(()=>{
        getData();
    }, [])

    function getData(){
        axios
            .get('http://localhost:4000/api/v1/Chauffeur/')
            .then(res=>(
                setLivreurs(res.data)
            ))
            .catch(err=>console.log(err))

        axios
            .get('http://localhost:4000/api/v1/Commande/')
            .then(res=>(
                setComandes(res.data)
            ))
            .catch(err=>console.log(err))
        
        axios
            .get('http://localhost:4000/api/v1/Responsable/')
            .then(res=>(
                setResLivraison(res.data)
            ))
            .catch(err=>console.log(err))
            
        axios
            .get('http://localhost:4000/api/v1/Manager/')
            .then(res=>(
                setManagers(res.data)
            ))
            .catch(err=>console.log(err))
    }

    let countLivreur =Livreurs.length;
    let countCommande =Comandes.length;
    let countResLivraison =ResLivraison.length;
    let countmanagers =Managers.length;

    return <div className="px-lg-4 px-xl-5 container-fluid">
                <section className="mb-3 mb-lg-5">
                    <div className="row">
                        <div className="mb-4 col-xl-3 col-md-6">
                            <div className="commande">
                                <div className="ellipse1" >
                                    <IoEllipseSharp />
                                </div>
                                <div className="descCommande">
                                    <h3>Responsables</h3>
                                    <p>{countResLivraison}</p>
                                </div>
                                <div className="ellipse2" >
                                    <IoEllipseSharp />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 col-xl-3 col-md-6">
                            <div className="commande">
                                <div className="ellipse1" >
                                    <IoEllipseSharp  />
                                </div>
                                <div className="descCommande">
                                    <h3>Comandes</h3>
                                    <p>{countCommande}</p>
                                </div>
                                <div className="ellipse2" >
                                    <IoEllipseSharp  />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 col-xl-3 col-md-6">
                            <div className="commande">
                                <div className="ellipse1" >
                                    <IoEllipseSharp  />
                                </div>
                                <div className="descCommande">
                                    <h3>Chauffeurs</h3>
                                    <p>{countLivreur}</p>
                                </div>
                                <div className="ellipse2" >
                                    <IoEllipseSharp  />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 col-xl-3 col-md-6">
                            <div className="commande">
                                <div className="ellipse1" >
                                    <IoEllipseSharp  />
                                </div>
                                <div className="descCommande">
                                    <h3>Managers</h3>
                                    <p >{countmanagers}</p>
                                </div>
                                <div className="ellipse2" >
                                    <IoEllipseSharp  />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-4 mb-lg-5">
                    <h2 class="section-heading section-heading-ms mb-4 mb-lg-5">Statistique des primes des chauffeurs</h2>
                    <Stats />
                </section>
        </div>
}

