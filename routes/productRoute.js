const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../graphql/schema");

const router = express.Router();

router.use(
  "/graphgql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = router;
