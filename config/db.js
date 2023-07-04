require('dotenv').config();
const mongoose = require("mongoose");
const logger = require("../app/utils/logger.utils");
const {  DB_NAME , DB_USER , DB_HOST , DB_PASSWORD , DB_PORT } = process.env;
console.log(DB_USER," ",DB_PASSWORD," ",DB_HOST);
const localUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const url = localUrl;
  
// DB Connection Start
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("DB CONNECTED SUCCESSFULLY..."))
  .catch((err) => logger.error(err));