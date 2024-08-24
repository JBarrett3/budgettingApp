import mongoose from "mongoose";
import { URI, db_user, db_password } from "./consts.js";

const setupDB = async () => {
    mongoose.connect(URI(db_user, db_password)).then(res => {
        mongoose.connection.db.admin().command({ ping: 1 });
        console.log("DB connection success!");
    }).catch(err => {
        console.log("DB connection failure!");
        console.log("error: ", err);
    });
}

export { setupDB, mongoose };