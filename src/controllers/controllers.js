const { error } = require("console");
const { newConnection } = require("../dataBase/dataBase");

//Añadir tarea
async function newTask(req, res) {

    const connection = await newConnection()

    const { title, description, isComplete } = req.body;

    if (!title || !description || !isComplete) {
        return res.status(400).send("All fields are required.");
    } else if (title.length <= 3 || description.length <= 3) return res.status(400).send("Values should have more than 3 characters.")
    else if (title.length > 255) {
        res.status(400).send("Title length cannot surpass 255 characters.")
    }
    else if (isComplete != 0 && isComplete != 1) {
        res.status(400).send("isComplete must be either 0 or 1.")
    }
    else try {
        { await connection.query("INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)", [title, description, isComplete]) };
        res.status(201).send("Task created successfully");
    } catch (error) {
        console.error
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
        console.error
        res.status(500).send("Error getting tasks.")
    }

    connection.end();
}

//Seleccionar una tarea por id
async function getTasksbyId(req, res) {

    const connection = await newConnection()

    const id = parseInt(req.params.id)

    try {
        const output = await connection.query("SELECT * FROM tasks WHERE id = ?", id)
        res.json(output[0])
    } catch (err) {
        console.error
        res.status(400).send("An error has occurred, check your entries and try again.")
    }

    connection.end()
}

//Actualizar una tarea mediante id
async function updById(req, res) {

    const connection = await newConnection()

    const id = req.params.id

    const { title, description, isComplete } = req.body

    if (!title || !description) {
        return res.status(400).send("Title and description are required to be modified.");
    } else if (title.length <= 3 || description.length <= 3) return res.status(400).send("Values should have more than 3 characters.")
    else if (title.length > 255) res.status(400).send("Title length cannot surpass 255 characters.")
    else if (isComplete != 0 && isComplete != 1) {
        res.status(400).send("isComplete must be either 0 or 1.")
    }
    else try {
        { await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", [title, description, id, isComplete]) };
        res.status(200).send("Selected task has been updated successfully.");
    } catch (error) {
        console.error;
        res.status(400).send("Error updating selected task.");
    }

    connection.end()
}

//Borrar una tarea por id
async function deleteById(req, res) {

    const connection = await newConnection()

    const id = req.params.id

    try {
        const output = await connection.query("DELETE FROM tasks WHERE id = ?", id)
        res.status(200).send(output)
    } catch (error) {
        console.error
        res.status(400).send("An error has occurred, please check your entries and try again.")
    }

    connection.end();
}

module.exports = {
    newTask,
    getTasks,
    getTasksbyId,
    updById,
    deleteById
}