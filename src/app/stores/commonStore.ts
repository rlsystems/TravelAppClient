import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    tenant: string | null = '';
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction( //Reaction -- > doesnt run when store is initialized, only runs when there is a change to 'token'
            () => this.token,
            token => {
                if(token){
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        //if(token) window.localStorage.setItem('jwt', token); //set to browser local storage --> now taken care of by the reaction
        this.token = token;
    }

    setTenant = (tenant: string | null) => {
        this.tenant = tenant;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}