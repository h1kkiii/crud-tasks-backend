import { Router } from "express";

import {
  newTask,
  getTasks,
  getTasksbyId,
  updById,
  deleteById,
} from "../controllers/controllers.js";

import {
    createTaskValidation,
  tasksvUpdates,
} from "../validations/validations.js";
import {
  applyValidations
} from "../middleware/midd.js"

const taskRouter = Router();

taskRouter.post("/tasks", createTaskValidation, applyValidations, newTask);
taskRouter.get("/tasks", getTasks);
taskRouter.get("/task/:id", getTasksbyId);
taskRouter.put("/task/:id", updById, tasksvUpdates);
taskRouter.delete("/task/:id", deleteById);

export { taskRouter };
