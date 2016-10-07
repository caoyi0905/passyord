'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const {ipcRenderer, shell} = electron;
const App = electron.remote.app;
const win = electron.remote.BrowserWindow.getFocusedWindow();
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Maxbrowser from 'material-ui/svg-icons/image/crop-din';
import Minbrowser from 'material-ui/svg-icons/content/remove';
import FlatButton from 'material-ui/FlatButton';
import Key from 'material-ui/svg-icons/communication/vpn-key';

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});

class Title extends React.Component {

    constructor(props) {
        super(props);

    }
    

    render() {
        return (
            <AppBar style={styles.root}
                title={<span style={styles.title}>Passyord</span>}
                iconElementLeft={<IconButton><Key/></IconButton>}
                iconElementRight={
                    <div className="navigationBtn">
                        <IconButton className='actionBtn' onClick={this._handleMinBrowser.bind(this)}><Minbrowser/></IconButton>
                        <IconButton className='actionBtn' onClick={this._handleMaxBrowser.bind(this)}><Maxbrowser/></IconButton>
                        <IconButton className='closeBtn' onClick={this._handleClose.bind(this)}><NavigationClose/></IconButton>
                    </div>
                }
                />
        );
    }

    _handleMinBrowser() {
        win.minimize();
    }

    _handleMaxBrowser() {
        if(win.isMaximized()){
            win.unmaximize();
        }else{
            win.maximize();
        }
    }

    _handleClose() {
        App.quit();
    }
}

const styles = {
    root: {
        WebkitAppRegion: 'drag'
    },
    title: {

    }
};

export default Title;