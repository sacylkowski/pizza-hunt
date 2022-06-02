const { Pizza } = require("../models");

// pizzaController object
const pizzaController = {
    getAllPizza(req, res) {
        // find instead of findAll()
        Pizza.find({})
        // populate a field, pass in an object with the key plus the value of the field you want populated
        // this is to populate the comments
        .populate({
            path: "comments",
            // the - sign indicates that we don't want this to be returned
            select: "-__v"
        })
        .select("-__v")
        // sort in DESC order by the _id value
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // destructured the params out of the req since that's the only data we need for the request
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
            path: "comments",
            select: "-__v"
        })
        .select("-__v")
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No pizza found with this id! "});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // destructure the body of the the Express.js req object becuase we don't need any other data
    createPizza({ body }, res) {
        // Mongoose uses the create() method vs MongoDB that uses .insertOne() and .insertMany()
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    updatePizza({ params, body }, res) {
        // the third param new: true is what returns the updated document.  It would return the original document if it wasn't there
        Pizza.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No pizza found with this id!" });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No pizza found with this id!" });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;