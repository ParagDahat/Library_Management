import cron from "node-cron";
import { User } from "../models/userModel";

export const removeUnverifiedAccounts = () => {
    cron.schedule("*/5 * * * *", async () => {
        const thirtMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        await User.deleteMany({
            accountVerified: false,
            createdAt: { $lt: thirtMinutesAgo },
        });
    })
}