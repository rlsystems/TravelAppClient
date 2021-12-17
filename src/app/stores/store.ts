import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import AppUserStore from "./appUserStore";
import BrandStore from "./brandStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    brandStore: BrandStore;
    appUserStore: AppUserStore;
}

export const store: Store = {
    activityStore: new ActivityStore(), //all stores will be added here
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    brandStore: new BrandStore(),
    appUserStore: new AppUserStore()
}

export const StoreContext = createContext(store); //store context is an object with activityStore inside

export function useStore() { //this is a hook 
    return useContext(StoreContext);
}