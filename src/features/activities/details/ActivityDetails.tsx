import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';


export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>()

    useEffect(() => {       
        if(id) loadActivity(id);  
    }, [id, loadActivity])

    if(loadingInitial || !selectedActivity) return <LoadingComponent/>; //to get rid of TS error, we will always have a selected activity

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={selectedActivity}/>
                <ActivityDetailedInfo activity={selectedActivity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
})