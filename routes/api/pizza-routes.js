const router = require("express").Router();
// import the functionality
// destructure the method names of the the imported object and use the names directly
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require("../../controllers/pizza-controller");

// can combine routes
router

.route("/")
.get(getAllPizza)
.post(createPizza);

router

.route("/:id")
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;