# Usf-Pnl Pro

Multi-platform VLESS proxy panel. Deploy to **HuggingFace**, **Railway**, **Render**, **Fly.io**, or **Koyeb** with one click.

**Live Panel Builder:** [godde3s.github.io/Usf-Pnl-pro](https://godde3s.github.io/Usf-Pnl-pro/)

---

## Quick Start (HuggingFace - Recommended)

1. Get a token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) (needs **Write** permission)
2. Go to the [Panel Builder](https://godde3s.github.io/Usf-Pnl-pro/)
3. Paste your token and click **Deploy to HuggingFace**
4. Wait 1-2 minutes, then access your panel

---

## Platform Comparison

| Feature | HuggingFace | Railway | Render | Fly.io | Koyeb |
|---|---|---|---|---|---|
| **Price** | Free | $5 credit/mo | Free | 3 free machines | 1 free service |
| **RAM** | 16 GB | 512 MB | 512 MB | 256 MB | 256 MB |
| **CPU** | 2 cores | 0.5 vCPU | 0.1 vCPU | 0.25 vCPU | 0.1 vCPU |
| **Bandwidth** | Unlimited | 1 GB/mo | 100 GB/mo | 160 GB/mo | Limited |
| **Auto-Sleep** | No | No\* | Yes (15 min) | No\*\* | Yes (5 min) |
| **Custom Domain** | No | Yes (free) | Paid only | Yes (free) | Yes |
| **Regions** | US, EU | 4 regions | 3 regions | 30+ regions | 2 regions |
| **WebSocket** | Full | Full | Full | Full | Full |
| **Docker** | Yes | Yes | Yes | Yes | Yes |

> \* Railway sleeps when $5 credit runs out.  
> \*\* Fly.io needs `auto_stop_machines = false` in fly.toml. Requires credit card on file (not charged).

**Recommendation:** HuggingFace is the best free option (16 GB RAM, no sleep, unlimited bandwidth).

---

## How to Get Your Tokens

### HuggingFace Token

1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Click **Create new token**
3. Token type: **Write** (required for uploading files)
4. Copy the token (starts with `hf_`)

**Direct link:** [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

---

### Railway Token

1. Go to [railway.app](https://railway.app) and sign in (GitHub login works)
2. Click your avatar (top-left) then **Account Settings**
3. Go to **API Tokens** tab
4. Click **New Token**, enter a name, create and copy

**Direct link:** [railway.app/account/tokens](https://railway.app/account/tokens)

---

### Render API Key

1. Go to [dashboard.render.com](https://dashboard.render.com) and sign in
2. Click your avatar (top-right) then **Account Settings**
3. Scroll to **API Keys** section
4. Click **Create API Key**, copy it

**Direct link:** [dashboard.render.com/account](https://dashboard.render.com/account)

---

### Fly.io Token

**Option A - CLI (Recommended):**
```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

**Option B - Web Token:**
1. Go to [fly.io/user/tokens](https://fly.io/user/tokens)
2. Click **Create an organization token**
3. Copy and save the token

**Note:** Credit card required for signup (not charged).  
**Direct link:** [fly.io/user/tokens](https://fly.io/user/tokens)

---

### Koyeb API Key

1. Go to [app.koyeb.com](https://app.koyeb.com) and sign in
2. Click your avatar (bottom-left) then **Account Settings**
3. Go to **API Keys** tab
4. Click **Create API Key**, copy it

**Direct link:** [app.koyeb.com/account/api-keys](https://app.koyeb.com/account/api-keys)

---

## Deployment Guides

### HuggingFace Spaces (One-Click)

The [Panel Builder](https://godde3s.github.io/Usf-Pnl-pro/) handles everything automatically. Just enter your HF token and click deploy.

**Manual method:**
```bash
# 1. Clone this repo
git clone https://github.com/Godde3s/Usf-Pnl-pro.git
cd Usf-Pnl-pro

# 2. Create a new Space via API
curl -X POST https://huggingface.co/api/spaces/YOUR_USERNAME/vless-panel \
  -H "Authorization: Bearer hf_YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sdk":"docker","private":false}'

# 3. Upload files
for file in app.py Dockerfile requirements.txt; do
  content=$(base64 -w0 "$file")
  curl -X POST "https://huggingface.co/api/spaces/YOUR_USERNAME/vless-panel/upload/$file" \
    -H "Authorization: Bearer hf_YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"content\":\"$content\"}"
done

# 4. Access at https://YOUR_USERNAME-vless-panel.hf.space
```

---

### Railway

1. **Fork** this repo to your GitHub account
2. Go to [railway.app/new](https://railway.app/new?repo=https://github.com/Godde3s/Usf-Pnl-pro) and connect the forked repo
3. Railway auto-detects the Dockerfile and builds
4. Set environment variable: `PORT=7860`
5. Select your preferred region in Project Settings
6. Access at the Railway-generated URL

**Requirements:** GitHub account, Railway account (free)

---

### Render

1. **Fork** this repo to your GitHub account
2. Go to [dashboard.render.com](https://dashboard.render.com) and click **New > Web Service**
3. Connect your GitHub account and select the forked repo
4. Settings:
   - Name: `vless-panel`
   - Environment: **Docker**
   - Region: Oregon / Frankfurt / Singapore
   - Plan: **Free**
   - Health Check Path: `/ping`
5. Add environment variable: `PORT=7860`
6. Click **Create Web Service**
7. Access at `https://vless-panel.onrender.com`

**Important:** Render free tier sleeps after 15 minutes. Set up [UptimeRobot](https://uptimerobot.com) to ping `/ping` every 5 minutes.

---

### Fly.io

```bash
# 1. Fork and clone this repo
git clone https://github.com/YOUR_USERNAME/Usf-Pnl-pro.git
cd Usf-Pnl-pro

# 2. Launch (fly.toml is already included)
fly launch --name vless-panel --region fra --no-deploy

# 3. Set port and deploy
fly secrets set PORT=7860
fly deploy

# 4. Access at https://vless-panel.fly.dev
```

**Note:** `fly.toml` is pre-configured with `auto_stop_machines = false` and `min_machines_running = 1`.

---

### Koyeb

1. **Fork** this repo to your GitHub account
2. Go to [app.koyeb.com/services/create](https://app.koyeb.com/services/create) and select **GitHub**
3. Select the forked repo, branch `main`
4. Settings:
   - Build: **Dockerfile** (auto-detected)
   - Service name: `vless-panel`
   - Region: Frankfurt (fra) or Washington DC (was)
   - Instance type: **Nano (Free)**
5. Add environment variable: `PORT=7860`
6. Click **Deploy**

**Important:** Koyeb free tier (Eco) is preemptible and may restart. Set up [UptimeRobot](https://uptimerobot.com) to ping `/ping` every 5 minutes.

---

## Keep-Alive Setup (Render & Koyeb)

Free tiers of Render and Koyeb spin down after inactivity. Use a free monitoring service to prevent this:

### UptimeRobot (Recommended)

1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Click **Add New Monitor**
3. Monitor Type: **HTTP(s)**
4. URL: `https://your-panel-url/ping`
5. Monitoring Interval: **5 minutes**
6. Save and enable

### Cron-job.org (Alternative)

1. Go to [cron-job.org](https://cron-job.org)
2. Create account and login
3. Create a new cronjob
4. URL: `https://your-panel-url/ping`
5. Schedule: Every 5 minutes

---

## File Structure

```
Usf-Pnl-pro/
  app.py              # Main panel (auto-detects platform)
  Dockerfile          # Universal Docker config
  requirements.txt    # Python dependencies
  fly.toml            # Fly.io config (no auto-sleep)
  render.yaml         # Render blueprint
  railway.json        # Railway config (healthchecks)
  koyeb.yaml          # Koyeb config
  .dockerignore       # Docker ignore rules
  docs/
    index.html        # Panel Builder (GitHub Pages)
  README.md           # This file
```

---

## Default Login

After deploying, login with:

```
Username: admin
Password: admin
```

**Change your password immediately after first login!**

---

## License

MIT