import fs from "fs/promises";
import { randomInt } from "crypto";
import { Trip } from "../models";
import { readDataBase } from "./budgetManager";

export const addTrip = async (
  destination: string,
  startDate: Date,
): Promise<string> => {
  const db = await readDataBase();

  const tripId = String(randomInt(1000, 9999));

  const newTrip: Trip = {
    id: tripId,
    destination: destination,
    startDate: startDate,
    activities: [],
  };

  db.trips.push(newTrip);
  try {
    await fs.writeFile("./db.json", JSON.stringify(db, null, 2));
  } catch (error) {
    throw new Error(`Failed to save trip: ${(error as Error).message}`);
  }

  return tripId;
};

export const deleteTrip = async (tripId: string): Promise<void> => {
  const db = await readDataBase();
  db.trips = db.trips.filter((t) => t.id !== tripId);
  try {
    await fs.writeFile("./db.json", JSON.stringify(db, null, 2));
  } catch (error) {
    throw new Error(`Failed to delete trip: ${(error as Error).message}`);
  }
};

export const deleteAllTrips = async (): Promise<void> => {
  const db = await readDataBase();
  db.trips = [];
  try {
    await fs.writeFile("./db.json", JSON.stringify(db, null, 2));
  } catch (error) {
    throw new Error(`Failed to delete all trips: ${(error as Error).message}`);
  }
};

export const getTrips = async (): Promise<Trip[]> => {
  const db = await readDataBase();
  return db.trips;
};
