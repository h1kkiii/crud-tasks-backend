const {Router} = require("express");
const router = Router();
const {newTask} = require("../controllers/controllers")

router.post("/tasks", newTask)

module.exports = router