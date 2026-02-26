import express from "express";
import { trackVisitor } from "../controllers/visitorController.js";

const visitorRouter = express.Router();

visitorRouter.post("/visitor", trackVisitor);

export default visitorRouter;
