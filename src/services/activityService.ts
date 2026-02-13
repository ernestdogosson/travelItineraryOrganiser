import { Activity } from "../models";
import { randomUUID } from "crypto";
import { compareAsc } from "date-fns";

let activities: Activity[] = [];

const addActivity = (
    name: string, 
    cost: number, 
    category: "food" | "transport" | "sightseeing", 
    startTime: Date 
): void => {

    const newActivity: Activity = {
        id: randomUUID(),
        name: name,
        cost: cost,
        category: category,
        startTime: startTime,
    }
    activities.push(newActivity)
};



const getActivitiesByDay = (date: Date): Activity[] =>{
    const activitiesOnDay: Activity[] =  []
    for (const activity of activities){
        if (activity.startTime.toDateString() === date.toDateString() ){
            activitiesOnDay.push(activity)
        }
    }
    return activitiesOnDay;
};

const getActivitiesByCategory = (category: "food" | "transport" | "sightseeing"): Activity[] =>{
    const filteredActivities: Activity[] =  []
    for (const activity of activities){
        if (activity.category === category ){
            filteredActivities.push(activity)
        }
    }
    return filteredActivities;
};

const getActivitiesChronologically = (): Activity[] =>{
    return [...activities].sort((a, b ) =>{
        return compareAsc((a.startTime), (b.startTime))
    });
};

addActivity("Museum", 150, "sightseeing", new Date("2026-02-15T22:00"))
console.log(getActivitiesChronologically());




//addActivity();
//getActivitiesByDay();
//getActivitiesByCategory();
//getAllCategoriesChronologically *