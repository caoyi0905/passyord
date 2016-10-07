'use strict';

const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;

const Database = require('./db');

let isDevelopment = true;

if (isDevelopment) {
    require('electron-reload')(__dirname, {
        ignored: /node_modules|[\/\\]\./
    });
}

var mainWnd = null;

function createMainWnd(database) {
    return function () {
        mainWnd = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            icon: 'public/img/icon.png',
        });

        mainWnd.db = database;

        if (isDevelopment) {
            mainWnd.webContents.openDevTools();
        }

        mainWnd.loadURL(`file://${__dirname}/index.html`);

        mainWnd.on('closed', () => {
            mainWnd = null;
        });
    }
}

let db = new Database(electron, function (database) {
    console.log('connected ok', database);
    app.on('ready', createMainWnd(database));
    app.on('window-all-closed', () => {
        app.quit();
    });

});
