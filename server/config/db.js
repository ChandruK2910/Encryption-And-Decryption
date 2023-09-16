const mongoose = require("mongoose");
const colors = require("colors")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(colors.bold.bgYellow.white(`Connected To MongoDb Database ${mongoose.connection.host}`));

    } catch (error) {
        console.log(colors.bold.bgRed.white(`MongoDB Error ${error}`));
    }
};


module.exports = connectDB;
