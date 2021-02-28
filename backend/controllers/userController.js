import * as account from './account_manage.js'

export default function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.logup);
}