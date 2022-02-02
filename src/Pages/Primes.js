import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../Css/Style.css'
import Wrapper from '../Components/Wrapper';
import axios from "axios"


const useStyles = makeStyles((theme) => ({
    headRow : {
        background: "#ff0707"
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
    },
}));
const Cells = ["chauffeur id","prix de livraison","mois", "distance","status de livraison"]
export default function Primes() {
  const classes = useStyles()
  const [data , setData] = useState([]);

  useEffect(() => {
      getdata();
  }, [])

  function getdata() {
      axios("http://localhost:4000/api/v1/Prime")
      .then((result)=> {
          console.log(result.data);
          setData(result.data)
      })
  }

  return (
      <div className="px-lg-4 px-xl-5 container-fluid">
          <Wrapper
              Title = "Prime"
              Breadcrumb = "prime" 
          />

          <div className="card-table mb-4 card">
              <div className="card-body">
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
                                          <TableCell className={classes.Cell}>{row.chauffeur}</TableCell>
                                          <TableCell className={classes.Cell}>{row.livraison_prix} Dh</TableCell>
                                          <TableCell className={classes.Cell}>{row.mois}</TableCell>
                                          <TableCell className={classes.Cell}>{row.livraison.distance_kilometrage} km</TableCell>
                                          <TableCell className={classes.Cell}>{row.livraison.status}</TableCell>
                                      </TableRow>
                                  ))}
{/* 
                                //   {emptyRows > 0 && (
                                //       <TableRow style={{ height: 53 * emptyRows }}>
                                //       <TableCell colSpan={6} />
                                //       </TableRow>
                                //   )} */}
                              </TableBody>
                          </Table>
                         
                      </TableContainer >
                     {/*  <TablePagination 
                          rowsPerPageOptions={[5, 10, 100]}
                          component= "div"
                          count={rows.length}
                          rowsPerPage = {rowsPerPage}
                          page = {page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                      /> */}
                  </Paper>
              </div>

          </div>
      </div>
      
  )
}
