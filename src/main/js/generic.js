const handlers = {
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

module.exports.handlers = handlers;