//react
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

//material-ui
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Lock from 'material-ui/svg-icons/action/lock';
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import WebIcon from 'material-ui/svg-icons/av/web';
import SvgIcon from 'material-ui/SvgIcon';
import * as svgs from '../constants/svgs.jsx';

//other
import LoginInfo from '../model/loginInfo';
import emitter from '../emitter';

//databse
import db from '../db';

const electron = window.require('electron');
const App = electron.remote.app;
const path = window.require('path');

let muiTheme = getMuiTheme({
  fontFamily: 'Microsoft YaHei'
});

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleLogout() {
    hashHistory.push('/');
  }


  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Drawer style={styles.drawer} containerStyle={styles.containerDrawer} open={true} swipeAreaWidth={256}>
          <MenuItem primaryText='登录信息' leftIcon={<Lock color={styles.svgColor}/>} menuItems={this.getLoginMenu() }>
          </MenuItem>
          <MenuItem primaryText='银行账户' leftIcon={<CreditCard color={styles.svgColor}/>} menuItems={getBankMenu() }>
          </MenuItem>
          <MenuItem style={styles.logoutBtn} primaryText='登出' leftIcon={<Back color={styles.svgColor}/>} onClick={this._handleLogout.bind(this) }>
          </MenuItem>
        </Drawer>
      </MuiThemeProvider>
    );
  }

  menuClick(svg) {
    emitter.emit('menuClick',svg);
  }

  getLoginMenu() {
    let loginMenu = [];
    for(let svg in svgs){
      let {Icon,viewBox,text} = svgs[svg];
      loginMenu.push(
        <MenuItem primaryText={text} leftIcon={<Icon color={styles.svgColor} viewBox={viewBox}/>} onTouchTap={this.menuClick.bind(this,svg)}/>
      )
    }
    return loginMenu;
  }
}

function getBankMenu() {
  return [
    <MenuItem primaryText='中国银行' leftIcon={<CreditCard color={styles.svgColor}/>} />,
    <MenuItem primaryText='农业银行' leftIcon={<CreditCard color={styles.svgColor}/>} />,
    <MenuItem primaryText='建设银行' leftIcon={<CreditCard color={styles.svgColor}/>} />,
    <MenuItem primaryText='工商银行' leftIcon={<CreditCard color={styles.svgColor}/>} />,
    <MenuItem primaryText='交通银行' leftIcon={<CreditCard color={styles.svgColor}/>} />,
    <MenuItem primaryText='招商银行' leftIcon={<CreditCard color={styles.svgColor}/>} />,
  ]
}



const styles = {
  drawer: {
    display: 'inline',
    width: muiTheme.drawer.width,
    height: '100%',
    float: 'left',
    WebkitUserSelect: 'none'
  },
  containerDrawer: {
    top: '64px'
  },
  logoutBtn: {
    bottom: '64px',
    position: 'fixed',
    width: '100%'
  },
  svgColor:  'rgba(0, 0, 0, 0.870588)'
}