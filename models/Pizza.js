const { Schema, model } = require("mongoose");
// just importing the Schema constructor and model function
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: "Large"
    },
    toppings: [],
    // you could also specify Array in place of the brackets

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
},
    {
        // telling the schema that it can use virtuals, we need to add the toJSON property to the schema
        // same with the getters
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
    // using the reduce method to tally up the total of every comment with its replies
    // reduce takes two parameters, an accumulator and a currentValue
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;