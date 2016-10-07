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
const win = electron.remote.BrowserWindow.getFocusedWindow();
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Key from 'material-ui/svg-icons/communication/vpn-key';
import Title from './title.jsx';
import Paper from 'material-ui/Paper';
import * as svgs from '../constants/svgs.jsx';

import emitter from '../emitter';

import LoginInfo from '../model/logininfo';

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});


export default class CardApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            buttonLabel: '编辑',
            viewBox: '',
            title: '',
            Icon: null,
            username: '',
            password: '',
            url: ''
        };

        let ctx = this;

        emitter.on('menuClick', function (value) {
            let svg = svgs[value];
            ctx.setState({
                Icon: svg.Icon,
                title: svg.text,
                viewBox: svg.viewBox
            },function (){
                ctx._handleFind();
            });   
        })
    }

    _handleFind() {
        let {username, password, url, title: webname} = this.state;
        let ctx = this;
        LoginInfo.find({}).then(function (data){
            console.log('LoginInfo.find',data);
        })
        LoginInfo.findOne({ webname: webname }).then(function (logininfo) {
            console.log('LoginInfo.findOne',logininfo,logininfo.username);
            if (!logininfo) {
                ctx.setState({
                    username: '',
                    password: '',
                    url: ''
                })
                return;
            }
            ctx.setState({
                username: logininfo.username,
                password: logininfo.password,
                url: logininfo.url,
            })
        })
    }

    _handleSave() {
        console.log('_handleSave');
        let {username, password, url, title: webname} = this.state;
        console.log(username, password, url, webname);
        // LoginInfo.findOneAndUpdate({ webname: webname }, {
        //     webname: webname,
        //     username: username,
        //     password: password,
        //     url: url
        // },{upsert: true}).then(function(logininfo){
        //     console.log('ok',logininfo);
        // });
    }

    _handleEdit() {

        if (this.state.disabled) {
            this.setState({
                disabled: false,
                buttonLabel: '保存'
            });
        } else {
            this.setState({
                disabled: true,
                buttonLabel: '编辑'
            });
            this._handleSave();
        }
    }

    render() {
        let renderData;
        const {state} = this;
        if (state.Icon) {
            renderData = (
                <div>
                    <state.Icon style={styles.Icon} color={styles.svgColor} viewBox={state.viewBox}/>
                    <h2 ref='webname'>{state.title}</h2>
                    <TextField  value={state.username}
                        onChange={e => this.setState({ username: e.target.value }) }
                        className='input'
                        disabled={state.disabled}
                        floatingLabelText="账号"
                        floatingLabelFocusStyle={styles.labelFocus}
                        inputStyle={styles.input}
                        underlineDisabledStyle={styles.disabledInput}
                        underlineStyle={styles.input}/> <br />
                    <TextField value={state.password}
                        onChange={e => this.setState({ password: e.target.value }) }
                        className='input'
                        disabled={state.disabled}
                        type="password"
                        floatingLabelText="密码"
                        floatingLabelFocusStyle={styles.labelFocus}
                        inputStyle={styles.input}
                        underlineDisabledStyle={styles.disabledInput}
                        underlineStyle={styles.input}/> <br />
                    <TextField value={state.url}
                        onChange={e => this.setState({ url: e.target.value }) }
                        className='input'
                        disabled={state.disabled}
                        floatingLabelText="网站"
                        floatingLabelFocusStyle={styles.labelFocus}
                        inputStyle={styles.input}
                        underlineDisabledStyle={styles.disabledInput}
                        underlineStyle={styles.input}/> <br />
                    <RaisedButton style={styles.actionBtn} label={state.buttonLabel} primary={true} onClick={this._handleEdit.bind(this) }/>
                </div>
            )
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.root}>
                    <Paper style={styles.paper}>
                        {renderData}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    };

}

const styles = {
    root: {
        witdh: '100%',
        height: '100%'
    },
    actionBtn: {
        marginTop: '15px'
    },
    paper: {
        paddingTop: '10%',
        height: '100%',
        textAlign: 'center'
    },
    input: {
        cursor: 'auto'
    },
    disabledInput: {
        cursor: 'auto',
        color: 'rgba(0, 0, 0, 0.870588)'
    },
    labelFocus: {
        fontSize: '1.3em'
    },
    svgColor: 'rgba(0, 0, 0, 0.870588)',
    Icon: {
        height: '48px',
        width: '48px'
    }
};
