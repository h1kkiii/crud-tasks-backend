const e = require("express");
const { newConnection } = require("../dataBase/dataBase");

async function newTask(req, res) {

    const connection = await newConnection()

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send("Title and description are required");
    } else if (title.length || description.length <3) return res.status(400).send("Values should have more than 3 characters.")
        else if (title.length >255) res.status(400).send("Title length cannot surpass 255 characters.")


    else try {
        {await connection.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description])};
        res.status(201).send("Task created successfully");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error creating task");
    }
}



module.exports = {
    newTask
}