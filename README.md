# SynapseLink Backend (Node.js + Express + MongoDB)

## Requirements
- Node.js 18+
- MongoDB (local or cloud)

## Setup
1. Copy `.env.example` to `.env` and set:
   - `MONGO_URI=mongodb://localhost:27017/synapselink`
   - `JWT_SECRET=...`
   - `OPENAI_API_KEY=` (optional)
2. Install deps:
   - `npm install`
3. Start:
   - `npm start`

## Folder Structure
- `src/config/db.js` — Mongo connection
- `src/models/*` — Mongoose models
- `src/controllers/*` — Request handlers
- `src/middleware/*` — Auth/roles/validation
- `src/routes/*` — Route modules
- `server.js` — App bootstrap

## Auth
- Signup: `POST /api/auth/signup`
  - Body: `{ "name": "Alice", "email": "alice@example.com", "password": "secret123", "role": "researcher" }`
- Login: `POST /api/auth/login`
  - Body: `{ "email": "alice@example.com", "password": "secret123" }`
  - Returns: `{ token, role, name }`
  - Use header: `Authorization: Bearer <token>`

## Climate Dataset
- List: `GET /api/climate`
- Create: `POST /api/climate` (auth roles: researcher/entrepreneur/admin)
  - Body: `{ "month": 3, "year": 2026, "metric": 1.25, "note": "global anomaly" }`
- Update: `PUT /api/climate/:id` (auth roles: researcher/entrepreneur/admin)
- Delete: `DELETE /api/climate/:id` (auth role: admin)

## Simulation
- Legacy: `POST /api/simulate`
  - Body: `{ "baselineEmissions": 1000, "adoptionRate": 0.3, "efficiencyGain": 0.2 }`
- New: `POST /api/simulation` (auth required)

## Ideation
- Generate: `GET /api/ideas` or `GET /api/ideas/generate?keywords=solar,grid`
- Save idea: `POST /api/ideas/save` (auth)
- Connect: `POST /api/ideas/connect` (auth)

## Researchers
- List: `GET /api/researchers`
- Create: `POST /api/researchers`
- Search: `POST /api/researchers/search`

## Security
- JWT auth with role checks
- Helmet, CORS, rate limiting
- Joi input validation

## Postman Examples
- Auth Signup: POST /api/auth/signup
- Auth Login: POST /api/auth/login
- Climate Create: POST /api/climate (Bearer token required)
- Simulation: POST /api/simulate
- Ideas Generate: GET /api/ideas?keywords=energy

## Notes
- If `OPENAI_API_KEY` is not set, ideation uses an offline generator.
- Static frontend is served from `/public`.
