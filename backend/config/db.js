import mongoose from "mongoose";
const connectdatabase = async () => {
try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log("Database connected successfully");
}catch(error) {
    console.log("Database connection failed");
    console.log(error);
}
};

export default connectdatabase;