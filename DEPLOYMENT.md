# Deployment Guide - Rabbit Hole PWA

## ⚠️ Important: Project Structure

This repository has a **nested structure**:
```
rabbithole/              (git root)
├── vercel.json          (Vercel config - points to subdirectory)
├── DEPLOYMENT.md        (this file)
└── rabbithole/          (actual app directory)
    ├── package.json
    ├── vite.config.ts
    ├── src/
    ├── public/
    └── dist/            (build output)
```

The actual application code is in the `rabbithole/` subdirectory.

## 🚀 Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy from repository root:**
```bash
cd /workspaces/rabbithole
vercel
```

The `vercel.json` configuration will automatically:
- Build from the `rabbithole/` subdirectory
- Set the output directory to `rabbithole/dist`
- Configure environment variables
- Set up SPA routing

### Method 2: Using Vercel Dashboard

1. **Go to:** https://vercel.com/new

2. **Import your GitHub repository:** `atgonza18/rabbithole`

3. **Vercel will auto-detect the `vercel.json` configuration** ✓

4. **Add environment variable (if needed):**
   - Name: `VITE_CONVEX_URL`
   - Value: `https://upbeat-gull-282.convex.cloud`

5. **Deploy!**

### Method 3: Manual Configuration (if vercel.json doesn't work)

If Vercel doesn't pick up the config:

**Framework Preset:** Vite
**Root Directory:** `rabbithole` ⬅️ **IMPORTANT**
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

**Environment Variables:**
- `VITE_CONVEX_URL` = `https://upbeat-gull-282.convex.cloud`

## 🔧 Troubleshooting

### Issue: 404 NOT_FOUND Error

**Cause:** Vercel is deploying from the wrong directory.

**Solution:**
1. Check that `vercel.json` exists in the root directory ✓
2. In Vercel dashboard → Project Settings → General
3. Set **Root Directory** to `rabbithole`
4. Redeploy

### Issue: Build Fails - Can't Find package.json

**Cause:** Build is running in the wrong directory.

**Solution:**
1. Ensure `vercel.json` has:
   ```json
   "buildCommand": "cd rabbithole && npm install && npm run build"
   ```
2. Or set Root Directory to `rabbithole` in Vercel settings

### Issue: Routes Don't Work (404 on refresh)

**Cause:** SPA routing not configured.

**Solution:** Already fixed in `vercel.json` with rewrites:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Issue: PWA Manifest Not Loading

**Cause:** Wrong MIME type for manifest.

**Solution:** Already fixed in `vercel.json` with headers:
```json
{
  "source": "/manifest.webmanifest",
  "headers": [{ "key": "Content-Type", "value": "application/manifest+json" }]
}
```

### Issue: Service Worker Not Registering

**Cause:** Service worker cache headers incorrect.

**Solution:** Already fixed in `vercel.json` with sw.js headers.

## 📱 After Deployment

### Test Your PWA on iOS

1. **Get your Vercel URL:** `https://your-project.vercel.app`

2. **Open in Safari on iOS device**

3. **Add to Home Screen:**
   - Tap Share button
   - Tap "Add to Home Screen"
   - Confirm

4. **Open from Home Screen:**
   - Should see NO browser UI ✓
   - Should feel like a native app ✓
   - Check console: "PWA Standalone Mode: true" ✓

5. **Verify in Safari Developer Tools (Mac):**
   - Connect iOS device to Mac
   - Safari → Develop → [Your Device] → [Your App]
   - Console should show PWA logs

## 🔄 Continuous Deployment

Once connected to GitHub:
1. Push to `main` branch → Auto-deploys to production
2. Push to other branches → Creates preview deployments
3. Pull requests → Automatic preview URLs

## 📊 Vercel Build Output

Expected output:
```
✓ Building application
✓ Generating static pages
✓ Collecting page data
✓ Finalizing page optimization

Route (pages)                              Size     First Load JS
┌ ○ /                                      1.2 kB         80 kB
└ ○ 404                                    150 B          78 kB
```

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. SSL certificate auto-provisioned

## 🔐 Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_CONVEX_URL` | `https://upbeat-gull-282.convex.cloud` | Required for database connection |

Note: Variables prefixed with `VITE_` are exposed to the client-side code.

## 📝 Deployment Checklist

- [x] `vercel.json` created with correct paths
- [x] `.vercelignore` excludes unnecessary files
- [x] Environment variables configured
- [x] SPA routing configured (rewrites)
- [x] PWA manifest headers configured
- [x] Service worker headers configured
- [ ] Deploy and test on iOS device
- [ ] Verify standalone mode works
- [ ] Check console logs for errors

## 🆘 Still Having Issues?

1. **Check Vercel build logs:**
   - Vercel Dashboard → Deployments → Click on deployment → Logs

2. **Check runtime logs:**
   - Vercel Dashboard → Deployments → Click on deployment → Runtime Logs

3. **Verify environment variables:**
   - Vercel Dashboard → Settings → Environment Variables

4. **Test locally first:**
   ```bash
   cd rabbithole
   npm run build
   npm run preview
   ```

5. **Clear Vercel cache:**
   - Vercel Dashboard → Settings → Data Cache → Clear Cache
   - Redeploy

---

**Questions?** Check the Vercel documentation: https://vercel.com/docs
