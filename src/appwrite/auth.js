import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class UserAuth{
    client = new Client();
    account;

    constructor(){
        this.client.
        setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signup({email,password,name}){
        try {
            const userAccount= await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession
            (email,password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            return console.log("Appwrite error:getCurrentUser:",error)
        }
        
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            return console.log("Appwrite error:logout:",error)

        }
    }
}

const authService = new UserAuth();

export default authService;