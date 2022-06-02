const router = require("express").Router();

const { addComment, removeComment, addReply, removeReply } = require("../../controllers/comment-controller");

router

.route("/:pizzaId")
.post(addComment);

router

.route("/:pizzaId/:commentId")
.delete(removeComment)
// put instead of a post because we're just updating the existing comment
.put(addReply);

router

// include the ids of the parent resources "go to this pizza then look at this comment, then delete this one reply"
.route("/:pizzaId/:commentId/:replyId")
.delete(removeReply);


module.exports = router;