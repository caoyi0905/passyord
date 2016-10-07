'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const {ipcRenderer, shell} = electron;
const {dialog} = electron.remote;

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Key from 'material-ui/svg-icons/communication/vpn-key';
import Title from './title.jsx';
import { connect } from 'react-redux';
import * as loginaction from '../actions/loginaction';

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});

class LoginApp extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            password: ''
        };
    }

    validatePassword() {
        const validatePassword = loginaction.getAccessSuccess(this.state.password);
        this.props.dispatch(validatePassword);
        hashHistory.push('/view');
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.root}>
                    <Title />
                    <div style={styles.loginForm}>
                        {/* <IconButton><Key/></IconButton> */}

                        <TextField id='TextField'
                            hintText='请输入主密码'
                            type='password'
                            value={this.state.password}
                            onChange={(event) => { this.setState({ password: event.target.value }) } }/>

                        <div style={styles.buttons_container}>
                            <RaisedButton
                                label="登录" primary={true}
                                onClick={this.validatePassword.bind(this) }/>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    root: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginForm: {
        marginTop: '20%'
    },
    icon: {
        width: 100,
        height: 100,
        display: 'block',
        margin: 'auto',
        paddingBottom: '40px'
    },
    buttons_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

LoginApp.propTypes = {
  
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(LoginApp);