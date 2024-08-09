import { body } from "express-validator";
import { validationResult } from "express-validator";


//Validacion para el POST
export const createTaskValidation = [
    body("title")
    .isString({
        max: 255,
        min: 3,
    }).withMessage("Title must be a String")
    .notEmpty().withMessage("Title must not be empty"),
    body("description")
    .isString().withMessage("Description must be a String")
    .notEmpty().withMessage("Description must not be empty"),
    body("isComplete")
    .isBoolean().withMessage("isComplete must be a Boolean")
    .notEmpty().withMessage("isComplete must not be empty"),
]

//Validacion para el PUT
export const tasksvUpdates = [
    body("title")
    .optional()
    .isString().withMessage("Title must be a String"),
    body("description")
    .optional()
    .isString().withMessage("Description must be a String"),
    body("isComplete")
    .optional()
    .isBoolean().withMessage("isComplete must be a Boolean")
]

