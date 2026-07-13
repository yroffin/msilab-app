# msilab-app

## Required configuration

The frontend requires `VITE_POCKETBASE_URL` at startup/build time.
No default PocketBase URL is embedded in the code.

1. Copy `.env.example` to `.env`.
2. Set `VITE_POCKETBASE_URL` to the target PocketBase base URL.

## CI/CD Deployment

For deployments via the GitHub Actions workflow (`deploy.yml`), you must configure the variable `VITE_POCKETBASE_URL` in your GitHub repository:
- Go to **Settings > Secrets and variables > Actions**.
- Under the **Variables** or **Secrets** tab, add `VITE_POCKETBASE_URL` with the target PocketBase URL.
- The build job will automatically extract this value and fail explicitly if it is not configured.

## Commands

- Development: `npm run dev`
- Tests: `npm test`
- Build: `npm run build`