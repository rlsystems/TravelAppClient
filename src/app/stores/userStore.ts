import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserLogin } from "../models/user";
import { store } from "./store";
import { history } from '../..';

export default class UserStore {

    currentUser: User | null = null; //like current

    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.currentUser;
    }

    login = async (creds: UserLogin) => {
        store.commonStore.setTenant(creds.tenant);

        try {          
            const response = await agent.Account.login(creds);          
            store.commonStore.setToken(response.data.token);
            const user = await agent.Account.current();
            
            runInAction(() => //timing issue with async operations
                this.currentUser = user.data
            );
            history.push('/brands');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    };


    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.currentUser = null;
        history.push('/');
    };
 



    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


 
    getCurrentUser = async () => {

        try {
            const result = await agent.Account.current();
            runInAction(() => //timing issue with async operations
                this.currentUser = result.data
            );
            return this.currentUser;
        } catch (error) {
            console.log(error);
        }
    }


    updateCurrentUser = async (user: User) => {
        store.appUserStore.loading = true;
        try {
            await agent.Account.update(user);
            runInAction(() => {
                store.appUserStore.appUserRegistry.set(user.id, user); //update in listing
                this.currentUser = user;       
                store.appUserStore.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                store.appUserStore.loading = false;
            })
        }
    }





}