import {Client,Account,ID} from 'appwrite'
import conf from '../conf'

export default class AuthService{
    client = new Client();
    constructor(){
        this.client.setEndpoint(conf.appwrite_url).setProject(conf.appwrite_projectid);
        this.Account = new Account(this.client);
    }
    async login({email,password}){
        try {
            this.logout();
            return await this.Account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }
    async signup({name,email,password}){
        try {
            const userAccount = await this.Account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async logout(){
        try {
            await this.Account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.Account.get();
        } catch (error) {
            throw error;
        }
    }
}
export const AuthServiceProvider = new AuthService();