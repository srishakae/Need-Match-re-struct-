# Deploy NeedMatch on Vercel

This ZIP contains the full combined source project plus a root vercel.json that deploys the React frontend and Python API together through Vercel Services.

## Update your existing GitHub repository

1. Extract this ZIP to a separate folder.
2. Copy the CONTENTS of its NeedMatch folder into your existing repository folder (C:\Users\Rahul\Downloads\NeedMatch), allowing replacements. Do not put another NeedMatch folder inside it. Keep your existing .git folder and any private backend/.env file. If you have changed application source since the previous ZIP, merge those changes instead of overwriting them; the deployment additions are vercel.json, .vercelignore, and this guide.
3. Open your existing repository folder in VS Code. The new vercel.json must be beside package.json, frontend/, and backend/.
4. In its terminal run:

```powershell
git add vercel.json .vercelignore DEPLOY-VERCEL.md README.md
git commit -m "Configure combined Vercel deployment"
git push
```

Do not upload the ZIP itself to GitHub. Vercel needs the extracted source files.

## Vercel import settings

1. Import srishakae/NEED-MATCH from GitHub, using branch main.
2. Root Directory: ./ (the repository root).
3. Application/Framework Preset: Services.
4. Import the multi-service project. Do not choose “Import single project” on either folder.
5. Use the service build settings from vercel.json; do not enter npm run setup or npm run dev as a Vercel build command.
6. No database credentials or other environment variables are required for the current demo and health API.
7. Deploy. If the import page still says vercel.json is missing, confirm the file is visible on GitHub's main branch and refresh the Vercel import page.

If you previously created a backend-only Vercel project, import a new combined Services project from the repository root. You can leave the old deployment alone.

## Verify after Vercel reports Ready

Replace YOUR-DOMAIN with the URL Vercel provides:

- https://YOUR-DOMAIN/ — NeedMatch website
- https://YOUR-DOMAIN/api/health — {"status":"ok","service":"NeedMatch API"}
- https://YOUR-DOMAIN/docs — interactive backend documentation

All requests use the same domain. The routes preserve /api/health as expected by the existing backend.

## Local development

Install Node.js 22.12+ and Python 3.10+, then run npm run setup followed by npm run dev from the root. See README.md for local setup details.

## What is and is not included

The original marketplace screens remain a browser-local demo using localStorage. The supplied backend exposes only a health endpoint and contains database models/migrations for future work. Deploying both services does not implement shared marketplace data, authentication, or payments. Database credentials are intentionally excluded.

The deployment configuration was checked against Vercel's published Services documentation and the packaged source layout. The frontend production build and backend import/health handler were verified locally. A live Vercel deployment has not been performed or verified for this ZIP.

References:
- https://vercel.com/docs/services
- https://vercel.com/docs/services/config-reference
- https://vercel.com/docs/services/routing
