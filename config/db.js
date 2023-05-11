const mongoose = require("mongoose");
const logger = require("../app/utils/logger.utils");
const {  DB_NAME , DB_USER , DB_HOST , DB_PASSWORD } = process.env;

const localUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

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