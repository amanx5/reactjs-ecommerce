import { setupPersistence } from "@/persistance";
import { setupApplication } from "@/application";

const persistanceInstance = await setupPersistence();

await setupApplication(persistanceInstance);
