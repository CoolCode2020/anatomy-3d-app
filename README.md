# anatomy-3d-app
App to help medicine students study anatomy using 3d models

Frontend mit vite und JS+SWC
backend node js + cors (damit backen und forntend von verschiedenen Domains kommen koennen) + nodaemon ( reloads ) + express

#3D Rendering for frontend : npm install three @react-three/fiber @react-three/drei


Stack : JavaScript React Fiber Three Blender



Strukturvorschlag (AI generated):
anatomy-3d-app/
├── docker/
│   └── nginx/                 # (optional) custom NGINX config
├── frontend/
│   └── src/
│       ├── assets/           # textures, images, sounds
│       ├── components/       # React components (e.g., OrganView, Controls)
│       ├── scenes/           # Three.js scenes, camera setup
│       ├── data/             # organ metadata (JSON, localization)
│       ├── styles/           # Tailwind/CSS/SASS
│       └── App.jsx 
├── backend/ using Express and node
│   └── src/
│       ├── api/              # Express routes or REST API
│       ├── models/           # DB models or data structure definitions
│       ├── utils/            # helper functions
│       └── server.js         # Entry point
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── .env


To Do: yaml, docker , belnder meshes download and first look
