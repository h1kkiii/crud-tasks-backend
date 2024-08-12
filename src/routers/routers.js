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
import { applyValidations } from "../middleware/midd.js";

const taskRouter = Router();

taskRouter.post("/", createTaskValidation, applyValidations, newTask);
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTasksbyId);
taskRouter.put("/:id", updById, tasksvUpdates);
taskRouter.delete("/:id", deleteById);

export { taskRouter };
