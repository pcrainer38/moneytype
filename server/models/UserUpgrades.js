import { Schema, model } from "mongoose";

const userUpgradesSchema = new Schema(
    {
        moneyMultiplier: {
            type: Number,
            default: 0
        }
    },
    {
        wordLength: {
            type: Number,
            default: 0
        }
    },
    {
        wordDifficulty: {
            type: Number,
            default: 0
        }
    },
    {
        timeExtender: {
            type: Number,
            default: 0
        }
    }
);

const UserUpgrades = model("UserUpgrades", userUpgradesSchema);

export default UserUpgrades;