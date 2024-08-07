const { newConnection } = require("../dataBase/dataBase");

async function newTask(req, res) {
    try {
        const connection = await newConnection()

        const { title, description } = req.body

        const output = await connection.query("INSERT INTO tasks (title, description) values (?,?)", [title, description])

        if (title === 0 && description === 0) {
            return "Invalid entries, try again.";
        } 
        connection.end((err) => {
            if (err) {
                console.error('Error closing connection:', err);
            } else {
                console.log('Connection closed successfully');
            }
        });


        res.send(output)

        connection.end()
    } catch (error) {
        console.log("An error has occurred, please check your entries and try again");
    }
}

module.exports = {
    newTask
}