const db = require("../config/db");
const util = require("util");

const query = util.promisify(db.query).bind(db);

exports.createLog = async (req, res) => {
    try {
        const { mood, anxiety, sleepDuration, physicalActivity, socialInteraction, stressLevel, symptoms, date } = req.body;
        const userId = req.user.id; 
        const queryText =
            "INSERT INTO logs (user_id, mood, anxiety, sleep_duration, physical_activity, social_interaction, stress_level, symptoms, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        await query(queryText, [userId, mood, anxiety, sleepDuration, physicalActivity, socialInteraction, stressLevel, symptoms, date]);
        
        res.status(201).json({ message: "Log created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLogs = async (req, res) => {
    try {
        const userId = req.user.id; 
        
        const queryText = "SELECT * FROM logs WHERE user_id = ? ORDER BY date DESC";
        const result = await query(queryText, [userId]);
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
