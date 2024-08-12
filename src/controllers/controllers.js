import { newConnection } from "../dataBase/dataBase.js";

//Añadir tarea
async function newTask(req, res) {
  const connection = await newConnection();

  const { title, description, isComplete } = req.body;

  try {
    await connection.query(
      "INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)",
      [title, description, isComplete]
    );
    res.status(201).send("Task created successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating task");
  }
}

//Obtener tareas
async function getTasks(req, res) {
  const connection = await newConnection();

  try {
    const [output] = await connection.query("SELECT * FROM tasks");
    if(output.length === 0) {
      res.json({msg:"No tasks were found"})
    } else  {
      res.json(output[0]);
    }
  } catch (err) {
    console.error;
    res.status(500).send("Error getting tasks.");
  }

  connection.end();
}

//Seleccionar una tarea por id
async function getTasksbyId(req, res) {
  const connection = await newConnection();

  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).send("Invalid task id.");
  } else
    try {
      const output = await connection.query(
        "SELECT * FROM tasks WHERE id = ?",
        id
      );
      res.json(output[0]);
    } catch (err) {
      console.error;
      res
        .status(400)
        .send("An error has occurred, check your entries and try again.");
    }

  connection.end();
}

//Actualizar una tarea mediante id
async function updById(req, res) {
  const connection = await newConnection();

  const id = req.params.id;
  if (!id) {
    return res.status(400).send("Invalid task id.");
  }

  const { title, description, isComplete } = req.body;

  try {
    {
      await connection.query(
        "UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?",
        [title, description, isComplete, id]
      );
    }
    res.status(200).send("Selected task has been updated successfully.");
  } catch (error) {
    console.error;
    res.status(400).send("Error updating selected task.");
  }

  connection.end();
}

//Borrar una tarea por id
async function deleteById(req, res) {
  const connection = await newConnection();

  const id = req.params.id;

  try {
    const output = await connection.query("DELETE FROM tasks WHERE id = ?", id);
    res.status(200).send(output);
  } catch (error) {
    console.error;
    res
      .status(400)
      .send("An error has occurred, please check your entries and try again.");
  }

  connection.end();
}

export { newTask, getTasks, getTasksbyId, updById, deleteById };
