import express, { Router } from "express";
import { AuthController } from "./auth.controller";

const router: Router = express.Router();

/**
 * @swagger
 * @openapi
 *
 * /register:
 *   post:
 *       description: this handles the user registation
 *       responses:
 *           200:
 *               description: this will return 200 when the request wents through
 *           400:
 *               description: this will return when a validation error occurs
 * */
router.post("/register", AuthController.registerHandler);

/**
 * @swagger
 * @openapi
 *
 * /login:
 *   post:
 *       description: this handles the user registation
 *       responses:
 *           200:
 *               description: this will return 200 when the request wents through
 *           400:
 *               description: this will return when a validation error occurs
 * */

router.post("/login", AuthController.loginHandler);
export default router;
