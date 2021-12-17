import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import AppUserStore from '../../../app/stores/appUserStore';
import { useStore } from '../../../app/stores/store';
import UserHeader from './UserHeader';
import UserListTable from './UserListTable';





export default observer( function UserDashboard() {


    const { appUserStore } = useStore();
    const {loadAppUsers, appUserRegistry} = appUserStore;


    useEffect(() => {
      if(appUserRegistry.size <= 1) loadAppUsers();
    }, [appUserRegistry.size, loadAppUsers])
  
  
    if (appUserStore.loadingInitial) return <LoadingComponent content='Loading Users...' />

    return (
        <div>
            <UserHeader/>
            <UserListTable/>
        </div>
      
    )
})