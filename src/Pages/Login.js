import React, { useState, useEffect } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useCookies } from 'react-cookie';
import axios from 'axios';


export default function Login() {
    const [api, setApi]= useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies(['user']);


    useEffect(() => {
        if(window.location.pathname === "/Manager/Auth"){
            setApi("http://localhost:4000/api/v1/AuthManager" )
        }else if(window.location.pathname === "/Admin/Auth"){
            setApi("http://localhost:4000/api/v1/AuthAdmin" )
        }else if(window.location.pathname === "/Chauffeur/Auth"){
            setApi("http://localhost:4000/api/v1/AuthChauffeur")
        }else if(window.location.pathname === "/Responsable/Auth"){
            setApi("http://localhost:4000/api/v1/AuthResponsable")
        } 
    }, [])
    
    function login(){
        axios
            .post(api,{
                Email:email,
                Password:password
            })
            .then(res=>{
                // setCookie('token', res.data.Reponse.token);
                // setCookie('role', res.data.Reponse.Role);
                localStorage.setItem('token', res.data.Reponse.token);
                localStorage.setItem('role', res.data.Reponse.Role);
                
                if (res.data.Reponse.Role === 'Admin') {
                    window.location="/"
                }else if(res.data.Reponse.Role === 'Manager') {
                    window.location="/Responsable"
                }else if(res.data.Reponse.Role === 'Responsable'){
                    window.location="/Chauffeur"
                }else if(res.data.Reponse.Role === 'Chauffeur'){
                    window.location="/Chauffeur"
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const paperStyle={padding :20,height:'34vh',width:580, margin:"190px 30vw"}
    const avatarStyle={backgroundColor:'#ff0707'}
    const btnstyle={margin:'20px 0px', backgroundColor:"#ff0707"}
    const container = {backgroundColor:"ff0707"}
    return(
        <Grid className={container} >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Authentifiez-Vous</h2>
                </Grid>
                <TextField 
                    label='Email' 
                    placeholder='Enter email' 
                    onChange={(e)=>{setEmail(e.target.value)}}      
                    fullWidth 
                    required/>
                <TextField 
                    label='Password' 
                    placeholder='Enter password' 
                    onChange={(e)=>{setPassword(e.target.value)}}      
                    type='password' 
                    fullWidth 
                    required/>
                <Button type='submit' onClick={(e)=>login()} color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
            </Paper>
        </Grid>
    )
}