const baseRoute = "/api";

module.exports = (app) => {
  app.use(`${baseRoute}/order`, require("./order.route"));
};
