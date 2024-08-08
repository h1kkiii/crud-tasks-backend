const {Router} = require("express");
const router = Router();
const {newTask, getTasks, getTasksbyId, updById, deleteById} = require("../controllers/controllers")

try {
    router.post("/tasks", newTask)
    router.get("/tasks", getTasks)
    router.get("/task/:id", getTasksbyId)
    router.put("/task/:id", updById)
    router.delete("/task/:id", deleteById)
} catch (error) {
    return res.status(404).send("Page not found.")
}

module.exports = router