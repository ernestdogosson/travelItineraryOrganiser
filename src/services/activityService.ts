import { Activity } from "../models";
import { randomUUID } from "crypto";

let activities: Activity[] = [];

const addActivity = (
    name: string, 
    cost: number, 
    category: "food" | "transport" | "sightseeing", 
    startTime: Date 
): void => {

    const newActivity = {
        id: randomUUID(),
        name: name,
        cost: cost,
        category: category,
        startTime: startTime,
    }
    activities.push(newActivity)
}

//addActivity();
//getActivitiesByDay();
//getActivitiesByCategory();
//getAllCategoriesChronologically