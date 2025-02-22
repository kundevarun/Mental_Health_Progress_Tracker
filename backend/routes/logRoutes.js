const express = require("express");
const router = express.Router();
const logController = require("../controller/logController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/api/logs/log", authMiddleware, logController.createLog);
router.get("/api/logs", authMiddleware, logController.getLogs);  

module.exports = router;
