import express from "express";
import cors from "cors";
import { SHA256 } from "crypto-js";

const PORT = 8080;
const app = express();
const database = { data: "Hello World", userId: 1 };
let originalDataHash = SHA256(JSON.stringify(database.userId)).toString();

const dataChanges = new Map();
dataChanges.set(originalDataHash, database.data);

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
	res.json(database);
});

app.post("/", (req, res) => {
	const { data, id } = req.body;

	database.data = data;
	database.userId = id;

	const newDataHash = SHA256(JSON.stringify(database.userId)).toString();
	dataChanges.set(newDataHash, data);

	res.sendStatus(200);
});

app.get("/verify", (req, res) => {
	const currentDataHash = SHA256(JSON.stringify(database.userId)).toString();

	if (currentDataHash === originalDataHash) {
		res.json({ message: "Data is verified successfully" });
	} else {
		const originalData = dataChanges.get(originalDataHash);
		database.data = originalData;
		res.json({
			message: "Data verification failed. Restored to original data.",
		});
	}
});

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});
