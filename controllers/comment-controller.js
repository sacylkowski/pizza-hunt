const { Comment, Pizza } = require("../models");

// commentController object
const commentController = {
    addComment({ body }, res) {
        // Mongoose uses the create() method vs MongoDB that uses .insertOne() and .insertMany()
        Comment.create(body)
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => res.status(400).json(err));
    },
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.id })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: "No comment found with this id!" });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = commentController;