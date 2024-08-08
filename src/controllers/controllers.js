const { newConnection } = require("../dataBase/dataBase");

//Añadir tarea
async function newTask(req, res) {

    const connection = await newConnection()

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send("Title and description are required");
    } else if (title.length <= 3 || description.length <= 3) return res.status(400).send("Values should have more than 3 characters.")
    else if (title.length > 255) res.status(400).send("Title length cannot surpass 255 characters.")
    else if (typeof title != String || typeof description != String) res.status(400).send("Title and description must be letters.")
    else try {
        { await connection.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description]) };
        res.status(201).send("Task created successfully");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error creating task");
    }

    connection.end()
}

//Obtener tareas
async function getTasks(req, res) {

    const connection = await newConnection()

    try {
        const output = await connection.query("SELECT * FROM tasks")
        res.json(output[0]);
    }
    catch (err) {
        return res.status(500).send("Error getting tasks.")
    }

    connection.end();
}

//Seleccionar una tarea por id
async function getTasksbyId(req, res) {

    const connection = await newConnection()

    const id = req.params.id

    try {
        const output = await connection.query("SELECT * FROM tasks WHERE id = ?", id)
        res.json(output[0])
    } catch (error) {
        res.status(400).send("An error has occurred, check your entries and try again.")
    }

    connection.end()
}
module.exports = {
    newTask,
    getTasks,
    getTasksbyId
}