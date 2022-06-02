const { Comment, Pizza } = require("../models");

// commentController object
const commentController = {
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        // returning the pizza Promise so we can do something with the results of the Mongoose operation
        .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                // $push method to add the comments id to the specific pizza we want to update
                // MongoDB-based functions start with $
                { $push: { comments: _id } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No pizza found with this id!" });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },
    // we aren't creating a reply document, we're just updating an existing comment
    // passing params so we can use it later
    addReply({ params, body }, res){
            Comment.findOneAndUpdate(
                    { _id: params.commentId },
                    { $push: { replies: body } },
                    { new: true, runValidators: true }
                )
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: "No pizza found with this id!" });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ message: "No comment found with this id!" });
            }
            // deletes the document while also returning its data
            return Pizza.findByIdAndUpdate(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No pizza found with this id!" });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },
    removeReply({ params }, res) {
       Comment.findByIdAndUpdate(
                { _id: params.commentId },
                { $pull: { replies: { replyId: params.replyId } } },
                { new: true }
            )
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err));
    }
};

module.exports = commentController;