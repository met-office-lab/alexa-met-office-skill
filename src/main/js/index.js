const Alexa = require("alexa-sdk");
const fetch = require("node-fetch");

const handlers = {
    "GetLocation": function () {
        const self = this;
        const location = this.event.request.intent.slots.location.value;
        if (!location) {
            self.emit(":ask", "where?", "where would you like the forecast for?")
        } else {
            this.emit("FulfillForecast");
        }
    },
    "GetForecast": function () {
        const self = this;
        const location = this.event.request.intent.slots.location.value;
        if (!location) {
            self.emit(":ask", "where?", "where would you like the forecast for?")
        } else {
            this.emit("FulfillForecast");
        }
    },
    "FulfillForecast": function () {
        const self = this;
        const location = this.event.request.intent.slots.location.value;
        if (!location) {
            self.emit(":ask", "where?", "where would you like the forecast for?")
        } else {
            fetch("https://shlmog4lwa.execute-api.eu-west-1.amazonaws.com/dev/datapoint?location=" + encodeURIComponent(location))
                .then(function (res) {
                    return res.json();
                })
                .then(function (json) {
                    console.log(json);
                    self.emit(":tell", json.properties.forecast.text.local)
                })
                .catch(function (err) {
                    console.error(err);
                    self.emit(":tell", "sorry I've failed you");
                });
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = "Don't panick";
        const reprompt = "Don't panick";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Bye");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "Bye");
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', "Bye");
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
