<p align="center">
  <img src="./public/ICON.png" alt="En Route" width="180" />
</p>

<h3 align="center">
  Full-Stack Navigation & Trip Optimization Application
</h3>

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,typescript,python,fastapi,docker,sqlite" />
</p>

---

<StackIcon name="reactnative" />

# En Route

En Route is a full-stack navigation application built to support intelligent trip planning rather than only simple point-to-point navigation. The highlighting features of the application are: optimized route calculation, multi-stop trips, and real-time navigation updates.

Unlike traditional navigation applications that primarily calculate the fastest route between two locations, En Route is built around trip optimization. The application allows users to efficiently organize multiple destinations while maintaining a clean and responsive mobile navigation experience.

<p align="center">
  <img src="./public/home-screen.png" alt="Home screen" width="250 style="margin-right: 10px;" />
  <img src="./public/search.png" alt="Search screen" width="250 style="margin-right: 10px;" />
  <img src="./public/navigation.png" alt="Navigation screen" width="250" />
</p>

## Architecture

En Route follows a client-server architecture.

**Frontend** React Native application handlers user search and is responsible for user interaction, map rendering, and presenting navigation information.
**FastAPI** backend performs all routing, optimization, and navigation calculations.
**Valhalla** serves as the routing engine while Nominatim provides address and location search through OpenStreetMap data.
**SQLite** is the persistent storage for local application data including trip history. Saved and loaded history when the application is opened.

## Technology Stack

**Frontend:** React Native, Expo, Expo Router, TypeScript, NativeWind (Tailwind CSS), MapLibre, OpenStreetMap
**Backend:** Python, FastAPI, Pydantic, Uvicorn, Routing & Optimization, Valhalla, Nominatim Geocoder
**Database:** SQLite, Local Storage
**Infra:** Docker, Git

## Project Structure

```
en-route/
│
├── src/
│   ├── api/                         # client API
│   ├── app/                         # Expo Router
│   ├── assets/                      # App assets
│   ├── components/                  # Shared UI
│   │   ├── history/
│   │   ├── map/
│   │   ├── route/
│   │   └── trip/
│   │
│   ├── database/                    # SQLite
│   ├── features/                    # Core features
│   │   ├── location/                # Location services
│   │   ├── routing/                 # Route calculation
│   │   ├── search/                  # Search
│   │   ├── navigation/              # Navigation
│   │   ├── trips/                   # Trip management
│   │   ├── checkpoints/             # Trip stops
│   │   └── optimization/            # Route optimization
│   │
│   ├── services/                    # External services
│   ├── hooks/                       # Shared hooks
│   ├── types/                       # Shared types
│   │   ├── coordinates.ts
│   │   └── api.ts
│   ├── utils/                       # Utilities
│   └── styles/                      # App styles
│
├── backend/
│   └── app/
│       ├── config.py
│       ├── main.py
│       ├── api/
│       ├── services/
│       └── schemas/
```

## Docker

The backend services can be run with Docker.

Build the project with:

```
docker compose build
```

Start the services with:

```
docker compose up
```

## OpenStreetMap Map Data

En Route uses OpenStreetMap data for geocoding and routing. The .osm.pbf map file is intentionally not included in the repository. Each user should obtain the appropriate OpenStreetMap .osm.pbf extract for the geographic area they want to use.

Place the downloaded file in:

map-data/

The Docker configuration mounts this directory into the routing services.

Valhalla requires its own tile data to be generated from the .osm.pbf file before it can provide routing.

For instructions on building Valhalla tiles, follow the official Valhalla documentation:

https://valhalla.github.io/valhalla/

The exact tile-building process depends on the map extract and Valhalla configuration being used.

Nominatim also requires the appropriate OpenStreetMap data to initialize its search database.

## Purpose

En Route serves as create a modern navigation platform that combines intelligent trip optimization with a clean mobile experience. Rather than simply providing directions, En Route focuses on helping users plan more efficient journeys through optimized routing, checkpoint management, and vehicle-aware navigation while maintaining a scalable full-stack architecture capable of supporting future cloud-based features.

# License

See LICENSE.md for the project license.