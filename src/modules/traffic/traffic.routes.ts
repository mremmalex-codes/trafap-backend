import express, { Router } from "express";
import { TrafficController } from "./traffic.controller";

const router: Router = express.Router();
router.post("/addTraffic", TrafficController.addTrafficHanlder);
router.post("/updateTraffic/:id", TrafficController.updateTrafficHandler);
router.get("/searchTraffic", TrafficController.searchTrafficHanlder);
router.get("/allTraffic", TrafficController.allTrafficHandler);
export default router;
