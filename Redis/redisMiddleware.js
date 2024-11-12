// cacheMiddleware.js
const { client } = require("./redis");

const cacheMiddleware = async (req, res, next) => {
  try {
    const data = await client.get("students"); // Use await for async call
    console.log("Data", data);

    if (data !== null) {
      console.log("Cache hit, returning cached data");
      return res.send(JSON.parse(data)); // Return cached data
    } else {
      console.log("Cache miss, proceeding to next middleware/controller");
      next(); // No cached data, proceed to the controller
    }
  } catch (err) {
    console.error("Redis error:", err);
    next(); // In case of error, proceed to the next middleware/controller
  }
};

module.exports = cacheMiddleware;
