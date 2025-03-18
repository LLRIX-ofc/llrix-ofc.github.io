const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const PC_SERVER_URL = "http://192.168.216.1:4000"; // Update with PC local IP

app.use(cors());
app.use(express.json());

// Proxy request to PC for sound list
app.get("/sounds", async (req, res) => {
    try {
        const response = await axios.get(`${PC_SERVER_URL}/sounds`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to PC" });
    }
});

// Proxy request to PC to play sound
app.post("/play", async (req, res) => {
    try {
        const response = await axios.post(`${PC_SERVER_URL}/play`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to play sound" });
    }
});

app.listen(PORT, () => console.log(`Render Proxy Server Running`));
