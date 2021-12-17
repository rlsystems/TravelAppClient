import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Brand } from "../models/brand";
import { SearchParams } from "../models/searchParams";


export default class BrandStore {

    brandRegistry = new Map<string, Brand>();
    selectedBrand: Brand | undefined = undefined;

    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;


    constructor() {
        makeAutoObservable(this) //Mobx will do the above code by inference
    }


    loadBrands = async () => {
        this.setLoadingInitial(true);
        try {

            const params: SearchParams = {
                keyword: '',
                pageNumber: 1,
                pageSize: 10
            }
            console.log('loading brands');
            const result = await agent.Brands.search(params); //get list of activities
            result.data.forEach(brand => {
                this.setBrand(brand);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadBrand = async (id: string) => {
        console.log('load brand')
        let brand = this.getBrand(id);
        if(brand) {
            this.selectedBrand = brand;
            return brand;
        } 
        else {
            this.loadingInitial = true;
            try {
                const result = await agent.Brands.details(id);
                //this.setActivity(activity);
                this.selectedBrand = result.data;
                this.setLoadingInitial(false);
                return result.data;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    //computed Property
    get brandsSorted() {
        return Array.from(this.brandRegistry.values());
    }

    //helper methods -----------------
    private getBrand = (id: string) => {
        return this.brandRegistry.get(id);
    }

    private setBrand = (brand: Brand) => { //this handles date formatting (for each object) 
        this.brandRegistry.set(brand.id, brand);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    //---------------------------------



    
    createBrand = async (brand: Brand) => {
        this.loading = true;

        try {
            let response = await agent.Brands.create(brand);
            runInAction(() => {
                brand.id = String(response.data); //The GUID
                this.brandRegistry.set(brand.id, brand); //add an brand to the Map Object

                this.selectedBrand = brand;
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

    updateBrand = async (brand: Brand) => {
        this.loading = true;


        try {
            await agent.Brands.update(brand);
            runInAction(() => {
                //this.activities = this.activities.filter(a => a.id !== activity.id); //creates a new array excluding the selected one
                //this.activities.push(activity) //add the updated activity in
                this.brandRegistry.set(brand.id, brand); //Map Object set will update if ID same
                this.selectedBrand = brand;
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


    deleteBrand = async (id: string) => {
        this.loading = true;


        try {
            await agent.Brands.delete(id); //delete from DB
            runInAction(() => {
                this.brandRegistry.delete(id); //delete from local memory
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