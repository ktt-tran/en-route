# En Route

En Route is a full-stack navigation application built with React Native and FastAPI that focuses on intelligent trip planning rather than simple point-to-point navigation. The application calculates optimized routes, supports multi-stop trips, provides real-time travel information, and is designed with future expansion into fuel optimization and cloud synchronization.

Unlike traditional navigation applications that primarily calculate the fastest route between two locations, En Route is built around trip optimization. The application allows users to efficiently organize multiple destinations while maintaining a clean, responsive, and modern mobile experience.

Features
Interactive MapLibre map using OpenStreetMap data
FastAPI backend for route processing
Valhalla routing engine
Route visualization
Estimated travel time
Distance calculation
Turn-by-turn route data
Local trip history
Multi-stop trip planning
Automatic checkpoint optimization
Fuel-aware route optimization

Architecture

En Route follows a client-server architecture.

The React Native application is responsible for user interaction, map rendering, and presenting navigation information.

The FastAPI backend performs all routing, optimization, and navigation calculations.

Valhalla serves as the routing engine while Photon provides address and location search through OpenStreetMap data.

SQLite is used during the MVP to persist local application data including trip history, recent searches, user preferences, and vehicle information.

The architecture is intentionally designed so SQLite can later be replaced with PostgreSQL without requiring major changes to the mobile application.

Technology Stack
Mobile
React Native
Expo
Expo Router
TypeScript
NativeWind (Tailwind CSS)
MapLibre
OpenStreetMap
Backend
Python
FastAPI
Pydantic
Uvicorn
Routing & Mapping
Valhalla
Photon Geocoder
OpenStreetMap
Local Storage
SQLite
Development
Docker
Git
GitHub

Project Structure

The project separates the mobile application from the backend to maintain a clean and scalable architecture.

The frontend is responsible for the user interface, while the backend performs routing, optimization, and navigation logic.

Business logic is isolated from presentation logic to simplify testing, maintenance, and future expansion.

Routing Pipeline

A typical routing request follows the following process:

User searches for a destination.
Photon converts the search into geographic coordinates.
The mobile application sends the coordinates to the FastAPI backend.
FastAPI requests an optimized route from Valhalla.
Valhalla returns routing geometry, maneuvers, distance, and estimated travel time.
FastAPI processes the response.
The optimized route is returned to the mobile application.
The route is rendered on the interactive map.
Trip Optimization

En Route is designed around intelligent route planning.

The optimization engine evaluates multiple destinations and determines an efficient visitation order while considering routing distance and estimated travel time.

This allows users to plan complex trips more efficiently than manually selecting each destination individually.

Navigation Features

The navigation system includes:

Current route progress
Remaining travel distance
Estimated arrival time (ETA)
Dynamic route recalculation
Movement tracking
Multi-stop navigation
Checkpoint management
Route optimization
Local Data Storage

During the MVP, SQLite stores information locally on the device including:

Recent trips
Trip history
Saved destinations
Favorite locations
Vehicle profiles
User preferences
Application settings

The routing engine itself does not rely on SQLite. Route calculations are performed by Valhalla through the FastAPI backend.

Future Scalability

The application architecture is intentionally modular to support future enhancements without requiring significant restructuring.

Planned improvements beyond the MVP include:

PostgreSQL with PostGIS
User authentication
Cloud synchronization
Cross-device trip history
Shared routes
Real-time traffic integration
Live fuel price integration
Offline map support
Cached routing
Push notifications
Development Principles

En Route emphasizes:

Modular architecture
Separation of concerns
Strong typing with TypeScript
RESTful API design
Scalable backend services
Cross-platform compatibility
Clean user experience
Maintainable codebase
Installation
Frontend
npm install
npx expo start
Backend

Create and activate a Python virtual environment.

python -m venv venv

Windows

venv\Scripts\activate

macOS / Linux

source venv/bin/activate

Install backend dependencies.

pip install -r requirements.txt

Run the FastAPI development server.

uvicorn app.main:app --reload
Goals

The objective of En Route is to create a modern navigation platform that combines intelligent trip optimization with a clean mobile experience.

Rather than simply providing directions, En Route focuses on helping users plan more efficient journeys through optimized routing, checkpoint management, and vehicle-aware navigation while maintaining a scalable full-stack architecture capable of supporting future cloud-based features.