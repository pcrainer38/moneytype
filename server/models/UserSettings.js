import { Schema, model } from "mongoose";

const userSettingsSchema = new Schema({
        theme: {
            type: String,
            default: "dark"
        },
        sound_option: {
            type: Boolean,
            default: true
        }
});

const UserSettings = model("UserSettings", userSettingsSchema);

export default UserSettings;