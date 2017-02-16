const Alexa = require("alexa-sdk");

const generic = require("./generic");
const forecast = require("./forecast");

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = "alexa-met-office-skill";
    alexa.registerHandlers(generic.handlers, forecast.handlers);
    alexa.execute();
};
