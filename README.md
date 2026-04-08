Anatomy 3D Learning App

This project is a 3D anatomy learning application that allows users to explore bones interactively in a browser.

Users can:
	•	View a 3D bone model
	•	Click on individual bones
	•	Get contextual information about selected bones
	•	Learn anatomy in an interactive, visual way

The app follows a fullstack architecture:
	•	Frontend: React + Vite + Three.js (3D rendering)
	•	Backend: Node.js + Express
	•	Database: SQLite (via better-sqlite3)
	•	Containerization: Docker + Docker Compose


  Setup: docker-compose up --build in file directory

⸻

🧠 Anatomy 3D Learning App

A simple fullstack web app to explore 3D bone models interactively.
Users can click bones in a 3D viewer and retrieve related information.

⸻

🚀 Quick Start

1. Requirements
	•	Docker + Docker Compose
or
	•	Node.js (v20 recommended)

⸻

🐳 Run with Docker (recommended)

git clone <your-repo-url>
cd anatomy-3d-app
docker-compose up --build

Access:
	•	Frontend → http://localhost:5173
	•	Backend → http://localhost:8080

⸻

💻 Run Locally (without Docker)

Backend

cd backend
npm install
npm rebuild better-sqlite3
npm run dev

Frontend

cd frontend
npm install
npm run dev


⸻

⚙️ What it does
	•	Displays an interactive 3D bone model
	•	Allows users to click and select bones
	•	Fetches bone-related data from the backend API
	•	Serves static 3D assets
	•	Runs a background process for data enrichment

⸻

🔌 API
	•	GET /api → test endpoint
	•	GET /bones → bone data

⸻

🗄️ Database
	•	SQLite database (development only)
	•	File location:

backend/mydatabase.db


⸻

⚠️ Notes
	•	CORS is set for http://localhost:5173
	•	App runs in development mode (npm run dev)
	•	Not production-ready yet

