# anatomy-3d-app
App to help medicine students study anatomy using 3d models


Stack : JavaScript React Fiber Three Blender

Strukturvorschlag (AI generated):
anatomy-3d-app/
├── docker/
│   └── nginx/                 # (optional) für custom NGINX config bei Deployment
├── public/                    # Static files für React (z. B. index.html)
│   └── models/                # .glb/.gltf/Objekte (z. B. Organe)
├── src/
│   ├── assets/                # Texturen, Bilder, Sounds
│   ├── components/            # React-Komponenten (z. B. OrganView, Controls)
│   ├── scenes/                # Drei.js Szenen, Kamera etc.
│   ├── data/                  # Organ-Metadaten (JSON, Lokalisierung etc.)
│   ├── styles/                # Tailwind/CSS/SASS
│   └── App.jsx                # Hauptkomponente
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── .env                      # (optional) für Umgebungsvariablen


To Do: yaml, docker , belnder meshes download and first look
