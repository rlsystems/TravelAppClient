import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { SearchParams } from "../models/searchParams";
import { RegisterTenantFormValues, Tenant } from "../models/tenant";


export default class TenantStore {

    tenantRegistry = new Map<string, Tenant>();
    selectedTenant: Tenant | undefined = undefined;

    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;


    constructor() {
        makeAutoObservable(this) //Mobx will do the above code by inference
    }


    loadTenants = async () => {
        this.setLoadingInitial(true);
        try {

            console.log('loading tenants');
            const result = await agent.Tenants.list(); 
            result.data.forEach(tenant => {
                this.setTenant(tenant);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadTenant = async (id: string) => {
        console.log('load tenant')
        let tenant = this.getTenant(id);
        if(tenant) {
            this.selectedTenant = tenant;
            return tenant;
        } 
        else {
            this.loadingInitial = true;
            try {
                const result = await agent.Tenants.details(id);
                this.selectedTenant = result.data;
                this.setLoadingInitial(false);
                return result.data;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

   

    //computed Property
    get tenantsSorted() {
        return Array.from(this.tenantRegistry.values());
    }

    //helper methods -----------------
    private getTenant = (id: string) => {
        return this.tenantRegistry.get(id);
    }

    private setTenant = (tenant: Tenant) => { //add to registry 
        this.tenantRegistry.set(tenant.id, tenant);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    //---------------------------------



    
    createTenant = async (tenant: Tenant) => {
        this.loading = true;

        try {
            let response = await agent.Tenants.create(tenant);
            runInAction(() => {
                //tenant.id = String(response.data.id); //The GUID

                tenant = response.data;
                this.tenantRegistry.set(tenant.id, tenant); //add an brand to the Map Object

                this.selectedTenant = tenant;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }





}