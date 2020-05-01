import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DropDown from '../dropDown/dropDown';
import axios from 'axios';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import './table.css';

const styles = theme => ({
    root: {
        width: '70%',
        postion: 'relative',
        top: '2%',
        marginLeft: '20%',
        marginTop: '2%',
        marginBottom: '10%',
        overflowX: 'auto',
        ['@media (max-width:768px)']: { 
            width: '100%',
            margin:'0%',
        }
    },
    table: {
        minWidth: 900,
        ['@media (max-width:768px)']: { 
            minWidth: 100,
        }
    },
    grid:{
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    city:{
      marginLeft: '33%',
        ['@media (max-width:768px)']: { 
            marginLeft: '20%',
        },
        ['@media (max-width:1024px)']: { 
            marginLeft: '18%',
        },
        ['@media (max-width:375px)']: { 
            marginLeft: '1%',
        },
        ['@media (max-width:414px)']: { 
            marginLeft: '33%',
        },
        ['@media (max-width:320px)']: { 
            marginLeft: '24%',
        },
    },
    heading:{
        marginLeft: '10px',
    },
    filter:{
        ['@media (max-width:320px)']: { 
            marginLeft: '50%',
        },
    },
    text:{
        marginTop: '0.8%',
        ['@media (max-width:320px)']: { 
            marginLeft: '60%',
        },
    }
});

class SimpleTable extends Component {
    state = {
        data: [],
        length: null,
        page: 0,
        rowsPerPage: 10,
        search:'',
        type:'',
        disable: true,
        showPagination: false,
    }

    getCityData = (city) => {
        axios.get('https://vast-shore-74260.herokuapp.com/banks?city=' + city).then(
            (res) => {
                this.setState({
                    data: res.data,
                    length: res.data.length,
                    showPagination: true,
                })
            }
        )
    }

    getCategory = (type) => {
        this.setState({
            type: type,
        });
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    serachHandler = (event) => {
        var term = event.target.value.toUpperCase();
        this.setState({
            search: term,
        });
    }
    
    enableSearch = () => {
        this.setState({
            disable: false,
        })
    }

    filterData = (term) => {
        let field = this.state.type;
        switch(field){
            case 'ifsc':
                return function(x){
                    return x.ifsc.includes(term);
                }
            break;
            case 'name':
                return function(x){
                    return x.bank_name.includes(term);
                }
            break;
            case 'address':
                return function(x){
                    return x.address.includes(term);
                }
            break;
            case '':
                return function(){
                    return !term;
                }
            break;
        }
        
    }
    render(){
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.grid}>
                    <Grid container spacing={12}>
                        <div className={classes.heading}>
                            <h2>Banks</h2>
                        </div>
                        <div className={classes.city}>
                            <DropDown type='city' city={this.getCityData} />
                        </div>
                        <div className={classes.filter}>
                            <DropDown type='category' enable={this.enableSearch} getType={this.getCategory} />
                        </div>
                        <div className={classes.text}>
                            {
                                this.state.disable? 
                                <TextField style={{width:'60%'}} id="standard-basic" label="Search" disabled /> :
                                <TextField style={{width:'60%'}} id="standard-basic" label="Search"  onChange= {this.serachHandler}/>
                            }
                        </div>
                    </Grid>
                </div>
                
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Bank</strong></TableCell>
                    <TableCell align="right"><strong>IFSC</strong></TableCell>
                    <TableCell align="right"><strong>Branch</strong></TableCell>
                    <TableCell align="right"><strong>Id</strong></TableCell>
                    <TableCell align="right"><strong>Address</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).filter(this.filterData(this.state.search)).map(row => (
                    <TableRow key={row.ifsc}>
                      <TableCell component="th" scope="row">
                        {row.bank_name}
                      </TableCell>
                      <TableCell align="right">{row.ifsc}</TableCell>
                      <TableCell align="right">{row.branch}</TableCell>
                      <TableCell align="right">{row.bank_id}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {
                this.state.showPagination?
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.state.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    : null
                }
            </Paper>
          );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);