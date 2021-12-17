import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import BrandFilters from './BrandFilters';
import BrandHeader from './BrandHeader';
import BrandListTable from './BrandListTable';




export default observer( function BrandDashboard() {


    const { brandStore } = useStore();
    const {loadBrands, brandRegistry} = brandStore;

    useEffect(() => {
      if(brandRegistry.size <= 1) loadBrands();
    }, [brandRegistry.size, loadBrands])
  
  
    if (brandStore.loadingInitial) return <LoadingComponent content='Loading Brands...' />

    return (
        <div>
            <BrandHeader/>
            <BrandFilters/>
            <BrandListTable />
        </div>
      
    )
})