import { createContext, useContext } from "react";
import AppUserStore from "./appUserStore";
import BrandStore from "./brandStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import TenantStore from "./tenantStore";
import UserStore from "./userStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    brandStore: BrandStore;
    appUserStore: AppUserStore;
    tenantStore: TenantStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    brandStore: new BrandStore(),
    appUserStore: new AppUserStore(),
    tenantStore: new TenantStore()
}

export const StoreContext = createContext(store); //store context is an object with activityStore inside

export function useStore() { //this is a hook 
    return useContext(StoreContext);
}