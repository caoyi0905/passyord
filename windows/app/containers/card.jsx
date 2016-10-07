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
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import Title from './title.jsx';
import Paper from 'material-ui/Paper';
import * as svgs from '../constants/svgs.jsx';
import emitter from '../emitter';

import LoginInfo from '../model/logininfo';
import BankInfo from '../model/bankinfo';

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});


export default class CardApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            buttonLabel: '编辑',
            showPswd: false,
            pswdLabel: '显示密码',
            viewBox: '',
            title: '',
            Icon: null,
            username: '',
            password: '',
            url: ''
        };

        let ctx = this;

        emitter.on('LoginMenuClick', function (value) {
            let svg = svgs[value];
            ctx.setState({
                Icon: svg.Icon,
                title: svg.text,
                viewBox: svg.viewBox,
                showPswd: false,
                pswdLabel: '显示密码'
            }, function () {
                ctx._handleFind();
            });
        })

        emitter.on('BankMenuClick', function (bank) {
            ctx.setState({
                Icon: CreditCard,
                title: bank,
                viewBox: '0 0 20 26',
                showPswd: false,
                pswdLabel: '显示密码'
            }, function () {
                ctx._handleFind();
            });
        })
    }

    _loginInfoFind() {
        let {username, password, url, title: webname} = this.state;
        let ctx = this;
        LoginInfo.find({}).then(function (data) {
            console.log('LoginInfo.find', data);
        })
        LoginInfo.findOne({ webname: webname }).then(function (logininfo) {
            if (!logininfo) {
                ctx.setState({
                    username: '',
                    password: '',
                    url: ''
                })
                return;
            }
            console.log('LoginInfo.findOne', logininfo, logininfo.username);
            ctx.setState({
                username: logininfo.username || '',
                password: logininfo.password || '',
                url: logininfo.url || '',
            })
        })
    }

    _bankInfoFind() {
        let {username, password, title: bankname} = this.state;
        let ctx = this;
        BankInfo.find({}).then(function (data) {
            console.log('BankInfo.find', data);
        })
        BankInfo.findOne({ bankname: bankname }).then(function (bankinfo) {
            if (!bankinfo) {
                ctx.setState({
                    username: '',
                    password: ''
                })
                return;
            }
            console.log('BankInfo.findOne', bankinfo, bankinfo.username);
            ctx.setState({
                username: bankinfo.username || '',
                password: bankinfo.password || ''
            })
        })
    }

    _handleFind() {
        if (this.isBankInfo()) {
            this._bankInfoFind();
        } else {
            this._loginInfoFind();
        }
    }

    _loginInfoSave() {
        let {username, password, url, title: webname} = this.state;
        LoginInfo.findOneAndUpdate({ webname: webname }, {
            webname: webname,
            username: username,
            password: password,
            url: url
        }, { upsert: true }).then(function (logininfo) {
            console.log('ok', logininfo);
        });
    }

    _bankInfoSave() {
        let {username, password, title: bankname} = this.state;
        BankInfo.findOneAndUpdate({ bankname: bankname }, {
            bankname: bankname,
            username: username,
            password: password,
        }, { upsert: true }).then(function (logininfo) {
            console.log('ok', logininfo);
        });
    }

    _handleSave() {
        if (this.isBankInfo()) {
            this._bankInfoSave();
        } else {
            this._loginInfoSave();
        }
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

    isBankInfo() {
        if (!this.state.title || typeof this.state.title !== 'string') return false;
        return this.state.title.indexOf('银行') > -1;
    }

    _handlePswd() {
        if (this.state.showPswd) {
            this.setState({
                showPswd: false,
                pswdLabel: '显示密码'
            });
        } else {
            this.setState({
                showPswd: true,
                pswdLabel: '隐藏密码'
            });
        }
    }

    render() {
        let renderData;
        const {state} = this;
        let urlData;
        if (state.Icon) {
            if (!this.isBankInfo()) {
                urlData = (
                    <div>
                        <TextField value={state.url}
                            onChange={e => this.setState({ url: e.target.value }) }
                            className='input'
                            disabled={state.disabled}
                            floatingLabelText="网站"
                            floatingLabelFocusStyle={styles.labelFocus}
                            inputStyle={styles.input}
                            underlineDisabledStyle={styles.disabledInput}
                            underlineStyle={styles.input}/>
                        <br/>
                    </div>
                )
            }
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
                        type={state.showPswd ? 'text' : 'password' }
                        floatingLabelText="密码"
                        floatingLabelFocusStyle={styles.labelFocus}
                        inputStyle={styles.input}
                        underlineDisabledStyle={styles.disabledInput}
                        underlineStyle={styles.input} maxLength={this.isBankInfo() ? 6 : 25 } id="password"/> <br />
                    {urlData}
                    <div>
                        <RaisedButton style={styles.pswdBtn} label={state.pswdLabel} backgroundColor={state.showPswd ? 'white' : 'red'}  labelColor={state.showPswd ? 'black' : 'white'} onClick={this._handlePswd.bind(this) }/>
                        <RaisedButton style={styles.actionBtn} label={state.buttonLabel} primary={true} onClick={this._handleEdit.bind(this) }/>

                    </div>
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
    pswdBtn: {
        marginTop: '15px'
    },
    actionBtn: {
        marginTop: '15px',
        marginLeft: '10px',
        marginRight: '10px'
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
