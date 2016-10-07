

import {Document} from 'camo';

export default class BankInfo extends Document {
    constructor() {
        super();

        this.bankname = String;
        this.username = String;
        this.password = String;
    }
    static collectionName() {
        return 'bankInfos';
    }

}