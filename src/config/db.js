const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://tratran:Tra12@cluster0.pvzatmr.mongodb.net/Sprezza?retryWrites=true&w=majority" || "mongodb://localhost/ecommerce-web";
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = connectDB;
