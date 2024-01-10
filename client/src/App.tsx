import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
	const [data, setData] = useState<string>();

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await fetch(API_URL);
		const { data } = await response.json();
		setData(data);
	};

	const updateData = async () => {
		await fetch(API_URL, {
			method: "POST",
			/**
			 * * Important, change the id to compromise data. Server has a user id of 1 stored in the db
			 */
			body: JSON.stringify({ data, id: 1 }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		await getData();
	};

	const verifyData = async () => {
		try {
			const response = await fetch(`${API_URL}/verify`, {
				method: "GET",
			});

			const { message } = await response.json();

			alert(message);
		} catch (error) {
			console.error("Error verifying data:", error.message);
		}

		await getData();
	};

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				position: "absolute",
				padding: 0,
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: "20px",
				fontSize: "30px",
			}}>
			<div>Saved Data</div>
			<input
				style={{ fontSize: "30px" }}
				type="text"
				value={data}
				onChange={(e) => setData(e.target.value)}
			/>

			<div style={{ display: "flex", gap: "10px" }}>
				<button style={{ fontSize: "20px" }} onClick={updateData}>
					Update Data
				</button>
				<button style={{ fontSize: "20px" }} onClick={verifyData}>
					Verify Data
				</button>
			</div>
		</div>
	);
}

export default App;
