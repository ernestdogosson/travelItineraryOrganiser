import inquirer from "inquirer";
import { getActivitiesChronologically } from "./services/activityService";

// main function that runs the menu loop
const main = async () => {
  let running = true;

  while (running) {
    console.log("\n=== Travel Itinerary Manager ===");

    // show the main menu and wait for user to pick an option
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        loop: false,
        choices: [
          { name: "View activities (chronological)", value: "view" },
          new inquirer.Separator(),
          { name: "Exit", value: "exit" },
        ],
      },
    ]);

    // handle whatever the user picked
    switch (choice) {
      case "view": {
        // get all activities sorted by time and display them
        const activities = getActivitiesChronologically();
        if (activities.length === 0) {
          console.log("\nNo activities found.");
        } else {
          console.log("\n--- Activities (Chronological) ---");
          activities.forEach((a) => {
            console.log(
              `- ${a.name} | $${a.cost} | ${a.category} | ${a.startTime.toLocaleString()}`
            );
          });
        }
        break;
      }

      case "exit": {
        console.log("\nGoodbye!");
        running = false;
        break;
      }
    }
  }
};

main();
