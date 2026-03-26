# THE CURSED ARCHIVE 👁
### Built by Connor & Dad — Powered by AI

## Deploy to Vercel (5 minutes)

### Option A: Vercel CLI (fastest)
1. Install Vercel CLI: `npm i -g vercel`
2. Unzip this project folder
3. Open terminal in the project folder
4. Run: `npm install`
5. Run: `vercel`
6. Follow the prompts (link to your existing project or create new)
7. Add your Anthropic API key:
   - Go to vercel.com → your project → Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = your key
8. Redeploy: `vercel --prod`

### Option B: GitHub + Vercel (auto-deploys on every change)
1. Create a GitHub repo
2. Push this code to it
3. Go to vercel.com → Import Project → select the repo
4. Add environment variable: `ANTHROPIC_API_KEY` = your key
5. Deploy!

### Connect connormantv.com
1. In Vercel dashboard → your project → Settings → Domains
2. Add: connormantv.com
3. Update DNS at your domain registrar to point to Vercel

## Getting an Anthropic API Key
1. Go to console.anthropic.com
2. Create an account / sign in
3. Go to API Keys → Create Key
4. Copy it and add to Vercel environment variables
