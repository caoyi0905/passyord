

import {Document} from 'camo';

export default class LoginInfo extends Document {
    constructor() {
        super();

        this.webname = String;
        this.url = String;
        this.username = String;
        this.password = String;
    }
    static collectionName() {
        return 'loginInfos';
    }

}