const Alexa = require("alexa-sdk");
const forecast = require("forecast");

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = "alexa-met-office-skill";
    alexa.registerHandlers(forecast.handlers);
    alexa.execute();
};
