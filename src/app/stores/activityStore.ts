import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();

    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this) //Mobx will do the above code by inference
    }


    //computed Property
    get activitiesByDate() { //sorts the array
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    //computed
    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list(); //get list of activities
            activities.forEach(activity => { //update the state
                // activity.date = activity.date.split('T')[0];
                // //this.activities.push(activity) //in mobx its correct to directly mutate objects
                // this.activityRegistry.set(activity.id, activity);

                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity) {
            this.selectedActivity = activity;
            return activity;
        } 
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                //this.setActivity(activity);
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    //helper methods -----------------
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    private setActivity = (activity: Activity) => { //this handles date formatting (for each object)

        //activity.date = activity.date.split('T')[0]; //this cuts off time portion of date

        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    //---------------------------------


    // selectActivity = (id: string) => {
    //     //this.selectedActivity = this.activities.find(a => a.id === id)
    //     this.selectedActivity = this.activityRegistry.get(id);

    // }
    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // openForm = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }


    createActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity); //add an activity to the Map Object

                this.selectedActivity = activity;
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



    updateActivity = async (activity: Activity) => {
        this.loading = true;


        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                //this.activities = this.activities.filter(a => a.id !== activity.id); //creates a new array excluding the selected one
                //this.activities.push(activity) //add the updated activity in
                this.activityRegistry.set(activity.id, activity); //Map Object set will update if ID same
                this.selectedActivity = activity;
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

    deleteActivity = async (id: string) => {
        this.loading = true;


        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
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