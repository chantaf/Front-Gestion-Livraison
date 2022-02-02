import React, { Component } from 'react'
import { RiHome8Fill } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AiFillCar } from "react-icons/ai";
import {BiMoney} from 'react-icons/bi';
import {GiStorkDelivery} from 'react-icons/gi';
import '../Css/Style.css'
import { useCookies } from "react-cookie";
// import { useHistory } from 'react-r-dom';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

export default function SideBar(){
    const [cookies, setCookie,removeCookie] = useCookies();
    const role = localStorage.getItem('role');

   
    function logout(){
        if (role=== 'Admin') {
            localStorage.clear();

            // removeCookie('role');
            window.location="/Admin/Auth"
        }else if(role=== 'Manager') {
            localStorage.clear();

            // removeCookie('role');
            window.location="/Manager/Auth"
          
        }else if(role=== 'Chauffeur'){
            localStorage.clear();

            // removeCookie('role');
            window.location="/Chauffeur/Auth"
            
        }else if(role=== 'Responsable'){
            localStorage.clear();

            // removeCookie('role');
            window.location="/Responsable/Auth"
           
        }
        
    }


        return (
            <div
                style={{ display: 'flex', overflow: 'scroll initial', height:'100vh' }}
            >
                <CDBSidebar textColor="white" backgroundColor="#111">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a
                            href="/"
                            className="text-decoration-none"
                            style={{ color: 'inherit' }}
                        >
                            Menu
                        </a>
                    </CDBSidebarHeader>
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>              
                            <NavLink exact to="/" activeClassName="activeClicked" >
                                {role === 'Admin' && ( <CDBSidebarMenuItem ><span className="sideIcon"><RiHome8Fill/></span>Home</CDBSidebarMenuItem>)}
                            </NavLink>

                            <NavLink exact to="/Commande" activeClassName="activeClicked">
                                <CDBSidebarMenuItem><span className="sideIcon"><GiStorkDelivery/></span>Commandes</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/Chauffeur" activeClassName="activeClicked">
                                <CDBSidebarMenuItem><span className="sideIcon"><IoPeopleSharp/></span>Chauffeurs</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/Manager" activeClassName="activeClicked">
                                {role === 'Admin' && (<CDBSidebarMenuItem><span className="sideIcon"><IoPeopleSharp/></span>Managers</CDBSidebarMenuItem>)}
                            </NavLink>
                            <NavLink exact to="/Responsable" activeClassName="activeClicked">
                            {role === 'Admin' && (<CDBSidebarMenuItem><span className="sideIcon"><IoPeopleSharp/></span>Responsabe de livraison</CDBSidebarMenuItem>)}
                                
                            </NavLink>
                            <NavLink exact to="/Prime" activeClassName="activeClicked">
                                <CDBSidebarMenuItem ><span className="sideIcon"><BiMoney/></span>Prime</CDBSidebarMenuItem>
                            </NavLink  >
                            <CDBSidebarMenuItem onClick={(e)=>logout()} ><span  className="sideIcon"><ExitToAppIcon/></span>Logout</CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
            </div>
        )
}

