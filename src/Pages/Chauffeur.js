import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../Css/Style.css'
import { useCookies } from 'react-cookie';
import axios from "axios"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles((theme) => ({
    headRow : {
        background:"#003f5c"
    },
    Head: {
      fontSize: '10pt',
      textTransform: "uppercase",
      fontWeight: "900",
      color: "white"
    },
    Cell: {
      fontSize: '9pt',
    }, 
    seeMore: {
      marginTop: theme.spacing(3),
    }
}));
  
const Cells = ["date depart","heure", "ville de depart", "ville d'arrive", "poids", "prix","distance","status","actions"]
const CellsPrime = ["prix de livraison","mois", "distance","id de livreur","status de livraison"]
function Livreur() {
    const [data , setData] = useState([]);
    const [prime , setprime] = useState([]);
    const [livreur , setLivreur] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);
    const classes = useStyles()

    useEffect(() => {
        getdata();
    }, [])

    
    function getdata() {
        axios("http://localhost:4000/api/commande/")
        .then((result)=> {
            setData(result.data)
        })

        axios("http://localhost:4000/api/prime/")
        .then((result)=> {
            setprime(result.data)
        })
    }
        
    return (
        <div className="px-lg-4 px-xl-5 container-fluid">
            <SearchBar 
                Title="Cherche un livreur"
                btn="Chercher"
            />

            <div className="card-table mb-4 card">
                <div className="card-body">             
                <div className='btn-container'>
                </div>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow className={classes.headRow}>
                                        {Cells.map(cell => (<TableCell className={classes.Head}>{cell}</TableCell>))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {data.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell className={classes.Cell}>{row.depart}</TableCell>
                                            <TableCell className={classes.Cell}>{row.heure}</TableCell>
                                            <TableCell className={classes.Cell}>{row.ville_depart}</TableCell>
                                            <TableCell className={classes.Cell}>{row.ville_arrive}</TableCell>
                                            <TableCell className={classes.Cell}>{row.poids}</TableCell>
                                            <TableCell className={classes.Cell}>{row.prix}</TableCell>
                                            <TableCell className={classes.Cell}>{row.distance_kilometrage} Km</TableCell>
                                            <TableCell className={classes.Cell}>{row.status}</TableCell>
                                            <TableCell className={classes.Cell} align="right"><EditIcon /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer >
                    </Paper>
                    
                </div>
            </div>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.headRow}>
                                {CellsPrime.map(cell => (<TableCell className={classes.Head}>{cell}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {prime.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell className={classes.Cell}>{row.livraison_prix} Dh</TableCell>
                                    <TableCell className={classes.Cell}>{row.mois}</TableCell>
                                    <TableCell className={classes.Cell}>{row.livraison.distance_kilometrage} km</TableCell>
                                    <TableCell className={classes.Cell}>{row.livraison.chauffeur}</TableCell>
                                    <TableCell className={classes.Cell}>{row.livraison.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Paper>
        </div>
        
        
    )
}

export default Livreur
