import { setupApplication, setupPersistence } from "@/setup";

const psh = await setupPersistence();

await setupApplication(psh);
