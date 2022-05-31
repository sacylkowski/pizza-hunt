const { Schema, model } = require("mongoose");
// just importing the Schema constructor and model function
// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: "Large"
    },
    toppings: []
    // you could also specify Array in place of the brackets
});

module.exports = Pizza;