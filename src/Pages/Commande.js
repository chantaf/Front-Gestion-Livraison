import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../Css/Style.css'
import Wrapper from '../Components/Wrapper';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
        background:"#ff0707"
    },
    Head: {
      fontSize: '10pt',
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
  
const Cells = ["date depart","zonne", "ville de depart", "ville d'arrive", "poids", "prix","Nom","distance","status"]
function Comande() {
    const [open, setOpen] = React.useState(false);
    const [DOpen, setDOpen] = React.useState(false);
    const [status, setStatus] = useState({ type: 'delete' });
    const [btnAdd, setbtnAdd] = useState({ type: 'add' });
    const handleOpen = () => setOpen(true);
    const handleClose = () => (setOpen(false),setStatus({ type: 'delete' }));
    const [Nom, setNom] = useState("");
    const [depart, setdepart] = useState("");
    const [VilleD, setVilleD] = useState("");
    const [Zone, setZone] = useState("");
    const [VilleA, setVilleA] = useState("");
    const [StatusCommade, setStatusCommade] = useState("");
    const [poids, setpoids] = useState("");
    const deleteClose = () => (setDOpen(false),setStatus({ type: 'delete' }));
    const [dataId,setdataId]=useState(null)
    const [data , setData] = useState([]);
    const classes = useStyles()

    useEffect(() => {
        getdata();
    }, [])
    
    function confirmationdelete(id){
        setStatus({ type: 'confirm' });
        setDOpen(true)
        setdataId(id)
    }

    function getdata() {
        axios("http://localhost:4000/api/v1/Commande")
        .then((result)=> {
            setData(result.data)
        })
    }

    function save(){
        axios
            .post(`http://localhost:4000/api/v1/Commande`,{
                Nom:  Nom,
                Zone: Zone,
                VilleD: VilleD,
                VilleA: VilleA,
                Poid: poids,
                Date: depart,
                Status: "en cours"
            })
            .then(res=>{
                getdata()
                handleClose()
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className="px-lg-4 px-xl-5 container-fluid">
            <Wrapper
                Title = "Commande"
                Breadcrumb = "Commande" 
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div className='header-btn'>
                    <Typography id="modal-modal-title" style={{ fontSize:"16px", marginTop:"6px" }}  variant="h6" component="h1">
                        commande
                    </Typography>
                    <Button onClick={handleClose}><CancelIcon style={{ color: '#003f5c',fontSize:'25px' , marginBottom:"13px" }} /></Button>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box
                        sx={{
                        '& > :not(style)': { m: 1, width: '90%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                        onChange={(e)=>{setNom(e.target.value)}}      
                        value={Nom}
                        id="Nom"
                        label="Nom"
                        type="Nom"
                        />
                        <TextField
                        onChange={(e)=>{setZone(e.target.value)}}      
                        value={Zone}
                        id="Zone"
                        label="Zone"
                        type="Zone"
                        />
                        <TextField
                        onChange={(e)=>{setdepart(e.target.value)}}      
                        value={depart}
                        id="date"
                        label=""
                        type="date"
                        />
                        <TextField
                        onChange={(e)=>{setpoids(e.target.value)}}      
                        value={poids}
                        id="poids"
                        label="poids"
                        type="number"
                        />
                        <Select
                        labelId="demo-simple-select-label"
                        label=""
                        value={VilleD}
                        onChange={(e)=>{setVilleD(e.target.value)}}      
                        > 
                            <MenuItem selected >choisir la ville de depart</MenuItem>
                            <MenuItem value="casablanca">casablanca</MenuItem>
                            <MenuItem value="agadir">agadir</MenuItem>
                            <MenuItem value="dakhla">dakhla</MenuItem>
                            <MenuItem value="safi">safi</MenuItem>
                            <MenuItem value="tanger">tanger</MenuItem>
                        </Select>
                        <Select
                        labelId="demo-simple-select-label"
                        label=""
                        value={VilleA}
                        onChange={(e)=>{setVilleA(e.target.value)}}      
                        >      
                            <MenuItem selected >choisir la ville d'arrive</MenuItem>
                            <MenuItem value="casablanca">casablanca</MenuItem>
                            <MenuItem value="agadir">agadir</MenuItem>
                            <MenuItem value="dakhla">dakhla</MenuItem>
                            <MenuItem value="safi">safi</MenuItem>
                            <MenuItem value="tanger">tanger</MenuItem>                        
                        </Select>
                        <div className='btn-del'>
                            {btnAdd?.type === 'add' && <Button className='btn-ajout'  onClick={save} id='addhh'  variant="outlined" type='submit' size="large">Add</Button>}
                        </div>
                        
                    </Box>
                </Typography>
                </Box>
            </Modal>
            <div className="card-table mb-4 card">
                <div className="card-body">
                <div className='btn-container'>
                    <Button className='btn-add' onClick={handleOpen}>Ajouter</Button>
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
                                            <TableCell className={classes.Cell}>{row.Date}</TableCell>
                                            <TableCell className={classes.Cell}>{row.Zone}</TableCell>
                                            <TableCell className={classes.Cell}>{row.VilleD}</TableCell>
                                            <TableCell className={classes.Cell}>{row.VilleA}</TableCell>
                                            <TableCell className={classes.Cell}>{row.Poid}</TableCell>
                                            <TableCell className={classes.Cell}>{row.Prix}</TableCell>
                                            <TableCell className={classes.Cell}>{row.Nom}</TableCell>
                                            <TableCell className={classes.Cell}>{row.Distance} Km</TableCell>
                                            <TableCell className={classes.Cell}>{row.Status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer >
                    </Paper>
                </div>
            </div>
        </div>
        
        
    )
}

export default Comande
