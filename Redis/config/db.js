const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

exports.databaseConnection = async () => {
  mongoose.connect(db);
  mongoose.connection.once("connected", () =>
    console.log("Connected to MongoDB to " + db)
  );
  mongoose.connection.on("error", (err) =>
    console.log("Error connecting to MongoDB...", err)
  );
};
