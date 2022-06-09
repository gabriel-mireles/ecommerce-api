require("dotenv").config();

const http = require("http");

const app = require("./app");
const connectDB = require("./services/db/connect.db");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

(async function () {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => console.log(`Listening on ${PORT}`));
  } catch (e) {
    console.error(e);
  }
})();
