# NeedMatch — combined project

**Deploy on Vercel:** see [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md). This package includes vercel.json for both services on one domain.

Open this **NeedMatch** folder in VS Code. It contains both supplied projects, with a shared setup/start workflow.

## Requirements

- Node.js 22.12+ (Node.js 20.19+ also works), including npm.
- Python 3.10+ with pip. On Windows enable “Add Python to PATH” during installation.
- Internet access for the first dependency installation.

## Start in VS Code

1. Extract the ZIP, then choose **File → Open Folder → NeedMatch**.
2. Open **Terminal → New Terminal** and run:

```sh
npm run setup
npm run dev
```

If PowerShell blocks `npm.ps1`, use `npm.cmd run setup` and `npm.cmd run dev`, or select a Command Prompt terminal.

Open http://127.0.0.1:8443 for the app and http://127.0.0.1:8000/docs for API documentation. Press Ctrl+C to stop both servers. Stop any earlier copies using ports 8443/8000 before launching this copy. Setup is needed only on first use or after dependency changes.

VS Code **Terminal → Run Task** also provides Setup, Run, and Build tasks.

## Folder layout

```text
NeedMatch/
  frontend/       React + TypeScript + Vite + Tailwind app
  backend/        FastAPI + SQLAlchemy + Alembic
  scripts/        Cross-platform setup and development launcher
  .vscode/        VS Code tasks and Python interpreter setting
  package.json    Shared commands
```

## Build

```sh
npm run build
```

The frontend output is `frontend/dist/`. The Python API runs separately; it does not need a frontend-style compile step.

## Current implementation and connection

The supplied frontend is a demo using browser localStorage. Its existing marketplace screens and behavior are preserved. The supplied backend implements only `GET /api/health`, alongside database models and migrations. Authentication and marketplace APIs are not yet implemented, and the demo data is not stored in the backend.

The local Vite server forwards `/api/*` to port 8000. For example, `fetch('/api/health')` reaches FastAPI. This provides the connection path for future API development; it does not replace the demo's localStorage logic.

Setup creates `backend/.env` with an empty DATABASE_URL so the health API runs without credentials. For database development, add your PostgreSQL/Supabase connection string there, then run Alembic from the backend directory using its virtual environment. See `backend/README.md` for schema details. Never commit real credentials.

## Packaging notes

Includes source, frontend npm lockfile, and setup configuration. Dependencies, virtual environments, compiled output, private credentials, and machine-specific paths are excluded. Figma-only hosting tooling was replaced by a standard local Vite configuration.

On macOS/Linux, choose `backend/.venv/bin/python` as the VS Code Python interpreter; the bundled setting defaults to Windows.
