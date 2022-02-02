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
import axios from "axios"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
  
const Cells = ["name","véhicule matricule", "véhicule type","actions"]  
function Vehicule() {
    const [open, setOpen] = React.useState(false);
    const [DOpen, setDOpen] = React.useState(false);
    const [status, setStatus] = useState({ type: 'delete' });
    const [btnAdd, setbtnAdd] = useState({ type: 'add' });
    const handleOpen = () => setOpen(true);
    const handleClose = () => (setOpen(false),
    setStatus({ type: 'delete' }));
    const [name, setName] = useState("");
    const [immantricule, setImmantricule] = useState("");
    const [type, setType] = useState("");
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
        axios("http://localhost:4000/api/camion/")
        .then((result)=> {
            setData(result.data)
        })
    }

    function save(){
        axios
            .post(`http://localhost:4000/api/camion/add`,{
                name:name,
                type:type,
                immatriculation:immantricule,
            })
            .then(res=>{
                getdata()
                handleClose()
            })
            .catch(err=>{
                console.log(err)
            })
    }

    function deleteRow() {
        axios
            .delete(`http://localhost:4000/api/camion/${dataId}`)
            .then(res=>{
                console.log(res);
                setDOpen(false)
                getdata()
                setStatus({ type: 'delete' });
            })
            .catch(err=>{
                console.log(err)
            })
    }

    function getById(id,name,immatricule,type){
        setName(name)
        setImmantricule(immatricule)
        setType(type)
        handleOpen()
        setdataId(id)
        setStatus({ type: 'delete' });
        setbtnAdd({ type: 'update' });
    }

    function updateData(){
        axios
            .put(`http://localhost:4000/api/camion/${dataId}`,{
                name:name,
                immatriculation:immantricule,
                type:setType
            })
            .then(res=>{
                setbtnAdd({ type: 'add' });
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
                Title = "vehicule"
                Breadcrumb = "vehicule" 
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
                        Ajouter une vehicule
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
                        onChange={(e)=>{setName(e.target.value)}}      
                        value={name}
                        id="name"
                        label="marque"
                        />
                        <TextField
                        onChange={(e)=>{setImmantricule(e.target.value)}}      
                        value={immantricule}
                        label="Immantriculation"
                        />
                        <Select
                        labelId="demo-simple-select-label"
                        label=""
                        value={type}
                        onChange={(e)=>{setType(e.target.value)}}      
                        >
                            <MenuItem value='voiture'>voiture</MenuItem>
                            <MenuItem value='petit'>petit</MenuItem>
                            <MenuItem value='grand'>grand</MenuItem>
                        </Select>
                        <div className='btn-del'>
                            {btnAdd?.type === 'add' && <Button className='btn-ajout'  onClick={save} variant="outlined" type='submit' size="large">Add</Button>}
                            {btnAdd?.type === 'update' && <Button className='btn-ajout'  onClick={updateData} variant="outlined" type='submit' size="large">Update</Button>}
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
                                            <TableCell className={classes.Cell}>{row.name}</TableCell>
                                            <TableCell className={classes.Cell}>{row.immatriculation}</TableCell>
                                            <TableCell className={classes.Cell}>{row.type}</TableCell>
                                            <TableCell className={classes.Cell} align="right">
                                            {status?.type === 'delete' && <DeleteIcon  onClick={()=>confirmationdelete(row._id)} />}
                                            {status?.type === 'confirm' && (
                                                <Modal
                                                    open={DOpen}
                                                    onClose={deleteClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <div className='header-btn'>
                                                            <Typography id="modal-modal-title" style={{ fontSize:"16px", marginTop:"6px" }}  variant="h6" component="h1">
                                                                Confirmer la supprission
                                                            </Typography>
                                                            <Button onClick={deleteClose}><CancelIcon style={{ color: '#003f5c',fontSize:'25px' , marginBottom:"13px" }} /></Button>
                                                        </div>
                                                        <div className='btn-del'>
                                                            <Button className='annul' onClick={deleteClose}>Annuler</Button>
                                                            <Button className='del'  onClick={()=>deleteRow(row._id)}>Confirmer</Button>
                                                        </div>
                                                    </Box>
                                                </Modal>
                                            )}
                                            <EditIcon onClick={() => getById(row._id,row.name,row.immatriculation, row.type )} />
                                            </TableCell>
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

export default Vehicule
