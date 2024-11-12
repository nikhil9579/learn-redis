// redis.js
const { createClient } = require("redis");

const client = createClient();

// Error handling
client.on("error", (err) => console.error("Redis Client Error", err));

const connectRedis = async () => {
  try {
    await client.connect(); // Use await to ensure connection is established
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
};

module.exports = { client, connectRedis }; // Export both the client and the connect function
