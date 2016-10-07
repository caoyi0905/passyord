'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

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
import AppBar from 'material-ui/AppBar';
import Title from './title.jsx';
import Sidebar from './drawer.jsx';
import CardApp from './card.jsx';
import {EventEmitter2} from 'eventemitter2';
let emitter = new EventEmitter2;

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});


export default class ViewApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '133'
        };
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.root}>
                    <Title />
                    <Sidebar />
                    <div style={styles.buttons_container}>
                        <CardApp />
                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 40
    },
    buttons_container: {
        height: '100%',
        display: 'inline !important',
        marginLeft: muiTheme.drawer.width
    }
};