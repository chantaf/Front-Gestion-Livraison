import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '@material-ui/styles';
import axios from "axios"


function Stats() {
    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            colors: ["#111"],
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ["Janvier","Févrir","Mars","Avril","Mai","Juin","Juill","Août","Septe","Octo","Nove","Déce "]
            }, 
            stroke: {
                curve: 'smooth'
            }
            
        },
        series: [
            {
                name: "montant total de prime",
                data: [30, 10, 45, 40, 49, 30, 30, 21,33,22,21,22]
            }
        ]
    };

    return (
        <div className="row">
            <div className="mb-4 mb-lg-0 col-lg-12">
                <div className="h-100 card">
                    <div className="card-header">
                        <h4 class="card-heading">Statistique des prime par mois</h4>
                    </div>
                    <div className="card-body">
                        <h4 className="header-title mb-3">Prime par mois :</h4>
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="line"
                            width="1140"
                            height="350"
                        />
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Stats
