import { setupApplication, setupPersistence } from "@/setup";
import { createLogsFolder } from "./utils";

const fileLoggingEnabled = await createLogsFolder();

const psh = await setupPersistence(fileLoggingEnabled);

await setupApplication(psh, fileLoggingEnabled);
