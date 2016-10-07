
const electron = window.require('electron');
const win = electron.remote.BrowserWindow.getFocusedWindow();
let Document = win.db.Document;
console.log(Document);
export default class LoginInfo extends Document {
    constructor() {
        super();

        console.log('LoginInfo cons');

        this.webname = String;
        this.url = String;
        this.username = String;
        this.password = String;
    }
    static collectionName() {
        return 'loginInfos';
    }

}