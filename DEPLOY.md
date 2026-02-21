# Deploy Alpha & Omega (Frontend + Backend) on Vercel

This project is set up for **one Vercel project**: the frontend (Vite/React) and the backend (Express) are deployed together. The API runs as serverless functions under `/api/*`.

---

## Prerequisites

- [Vercel account](https://vercel.com/signup)
- [Git](https://git-scm.com/) (recommended) or Vercel CLI
- Your repo pushed to GitHub/GitLab/Bitbucket (optional but recommended)

---

## Step 1: Push your code to Git (recommended)

```bash
cd alphaomega-main
git init
git add .
git commit -m "Initial commit"
```

Create a new repo on GitHub/GitLab, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Step 2: Set environment variables for the backend

Your backend uses variables from `backend/.env`. On Vercel you must set these in the dashboard (do **not** commit `.env`).

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Settings** → **Environment Variables**.
2. Add these (use the same names; adjust values for production):

| Name | Description | Example |
|------|-------------|--------|
| `SUPABASE_URL` | Supabase project URL | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anon key | from Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | from Supabase dashboard |
| `ADMIN_EMAIL` | Admin login email | e.g. `admin@yourdomain.com` |
| `ADMIN_PASSWORD` | Admin login password | use a strong password |
| `EMAIL_SERVICE` | Email service name | e.g. `gmail` |
| `EMAIL_USER` | Email address for sending | your email |
| `EMAIL_PASS` | App password (e.g. Gmail) | app-specific password |
| `OWNER_EMAIL` | Owner notification email | your email |

Apply to **Production**, **Preview**, and **Development** as needed.

---

## Step 3: Deploy from Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new).
2. **Import** your Git repository (or upload the `alphaomega-main` folder if you’re not using Git).
3. **Root Directory:** leave as **`.`** (project root).
4. **Framework Preset:** Vercel usually detects **Vite**; if not, choose **Vite**.
5. **Build Command:** `npm run build` (already in `vercel.json`).
6. **Output Directory:** `dist` (already in `vercel.json`).
7. **Install Command:** `npm install && cd backend && npm install` (already in `vercel.json`).
8. Add the **Environment Variables** from Step 2.
9. Click **Deploy**.

---

## Step 4: Deploy with Vercel CLI (alternative)

```bash
npm i -g vercel
cd alphaomega-main
vercel
```

Follow the prompts (link to existing project or create new). Then add env vars:

```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
# ... add the rest as above
```

Redeploy:

```bash
vercel --prod
```

---

## What gets deployed

- **Frontend:** Built with `npm run build` (Vite), served from `dist`. All non-API routes are rewritten to `index.html` (SPA).
- **Backend:** Express app in `backend/` runs as a **serverless function**. All requests to `/api/*` (e.g. `/api/auth/login`, `/api/orders`, `/api/products`) are handled by `api/[[...path]].js`, which forwards to your Express app.

---

## Frontend API URL

The frontend uses `VITE_API_URL` or falls back to `/api`. On Vercel you **don’t need** to set `VITE_API_URL`: the app and API are on the same domain, so `/api` is correct.  
If you ever deploy the API on a different domain, set:

- **Name:** `VITE_API_URL`  
- **Value:** `https://your-api-domain.com/api`  
(Only build-time env vars starting with `VITE_` are available in the client.)

---

## Important notes

1. **Uploads folder:** The backend serves `/uploads` from disk. On Vercel (serverless) the filesystem is not persistent. For production, store uploads in **Supabase Storage** (or similar) and update the backend to use that instead of the local `uploads` folder.
2. **Secrets:** Never commit `backend/.env`. Use only Vercel (or your host’s) environment variables.
3. **Local run:**  
   - Frontend: `npm run dev`  
   - Backend: `cd backend && npm run dev`  
   The backend listens on port 5000 when not in the `VERCEL` environment.

---

## Troubleshooting

- **API 404 / 500:** Check that all env vars are set in Vercel and that **Install Command** runs `npm install` in both root and `backend`.
- **CORS:** The backend has `cors()` enabled; same-origin deployment on Vercel should not need extra CORS config.
- **Build fails:** Ensure **Root Directory** is the folder that contains `package.json`, `backend/`, and `api/`.

You’re done. Your site will be at `https://your-project.vercel.app` (or your custom domain).
