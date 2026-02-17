import fs from "fs/promises";
import { Trip } from "../models";
import { readDataBase } from "./budgetManager";

export const addTrip = async (
    destination: string,
    startDate: Date
): Promise<string> => {
    const db = await readDataBase();

    // generate the next trip id based on how many trips exist
    const nextNumber = db.trips.length + 1;
    const tripId = `trip_${String(nextNumber).padStart(3, "0")}`;

    const newTrip: Trip = {
        id: tripId,
        destination: destination,
        startDate: startDate,
        activities: [],
    };

    db.trips.push(newTrip);
    await fs.writeFile("./db.json", JSON.stringify(db, null, 2));

    return tripId;
};
