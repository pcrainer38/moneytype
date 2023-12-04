import { Schema, model } from "mongoose";

const userSettingsSchema = new Schema({
        theme: {
            type: String,
            default: "dark"
        }
});

const UserSettings = model("UserSettings", userSettingsSchema);

export default UserSettings;