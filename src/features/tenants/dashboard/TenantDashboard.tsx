import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import TenantHeader from './TenantHeader';
import TenantListTable from './TenantListTable';





export default observer( function TenantDashboard() {


    const { tenantStore } = useStore();
    const {loadTenants, tenantRegistry} = tenantStore;

    useEffect(() => {
      if(tenantRegistry.size < 1) loadTenants();
    }, [tenantRegistry.size, loadTenants])
  
  
    if (tenantStore.loadingInitial) return <LoadingComponent content='Loading Tenants...' />

    return (
        <div>
            <TenantHeader/>
            <TenantListTable/>
      
        </div>
      
    )
})